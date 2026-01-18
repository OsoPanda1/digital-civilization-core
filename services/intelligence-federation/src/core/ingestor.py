import json
import hashlib
import uuid
import structlog
from datetime import datetime, timezone
from typing import Dict, Any, Optional

from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func
from sqlalchemy.exc import SQLAlchemyError

from ..models.sovereign_event import TAMVCrumEntity, RiskLevel
from ..security.anubis import AnubisSentinel

logger = structlog.get_logger("tamv.ingestor")

class IntegrityError(Exception):
    """Falla crítica: La cadena de bloques del Ledger ha sido alterada."""
    pass

class SovereignIngestor:
    def __init__(self, db: AsyncSession, redis: Redis, sentinel: AnubisSentinel):
        self.db = db
        self.redis = redis
        self.sentinel = sentinel
        self.genesis_hash = "0" * 128  # SHA3-512 Initial State

    async def commit_crum(
        self,
        raw_data: Dict[str, Any],
        agent_profile: Dict[str, Any],
        creator_ctx: Dict[str, Any],
        verified_by_root: bool = False,
    ) -> str:
        log = logger.bind(
            trace_id=agent_profile.get("trace_id"),
            action=raw_data.get("action"),
            ip=agent_profile.get("ip"),
            creator=creator_ctx.get("did"),
        )

        try:
            # 1. Verificación de cadena
            if not await self._verify_chain_link():
                await self._trigger_emergency_protocol(
                    reason="CHAIN_BREACH_DETECTED",
                    severity=100.0,
                    source="LEDGER_INTEGRITY",
                )
                raise IntegrityError("CRITICAL: Ledger chain link is broken. Ingestion halted.")

            # 2. Recuperar último hash
            last_crum = await self._fetch_last_crum()
            previous_hash = last_crum.integrity_hash if last_crum else self.genesis_hash

            # 3. Construcción criptográfica
            crum_id = str(uuid.uuid4())
            timestamp = datetime.now(timezone.utc)
            payload_json = json.dumps(raw_data, sort_keys=True, separators=(",", ":"))
            salt = agent_profile.get("trace_id", "") + str(uuid.uuid4())
            checksum_context = f"{crum_id}|{previous_hash}|{payload_json}|{timestamp.isoformat()}|{salt}"
            integrity_hash = hashlib.sha3_512(checksum_context.encode("utf-8")).hexdigest()

            # 4. Preparar entidad
            new_crum = TAMVCrumEntity(
                id=crum_id,
                canonical_id=f"TAMV-{timestamp.strftime('%Y%m%d')}-{crum_id[:8]}",
                action_type=raw_data.get("action", "UNDEFINED"),
                payload=raw_data,
                agent_metadata=agent_profile,
                creator_did=creator_ctx.get("did"),
                creator_signature=creator_ctx.get("signature"),
                integrity_hash=integrity_hash,
                previous_hash=previous_hash,
                risk_level=(raw_data.get("risk") or RiskLevel.LOW).upper(),
                verified_by_root=verified_by_root,
                created_at=timestamp,
                non_repudiation_token=f"TAMV-CERT-{crum_id[:8]}",
            )

            # 5. Persistencia
            self.db.add(new_crum)
            await self.db.flush()
            await self.db.commit()

            log.info("crum_anchored_successfully", crum_id=crum_id, hash=integrity_hash[:16])
            await self.sentinel.log_attempt(agent_profile.get("ip", "unknown"), success=True)

            return crum_id

        except SQLAlchemyError as db_err:
            await self.db.rollback()
            log.error("ledger_persistence_error", error=str(db_err))
            await self.sentinel.log_attempt(agent_profile.get("ip", "unknown"), success=False, reason="DB_ERROR")
            raise db_err
        except Exception as e:
            await self.db.rollback()
            log.critical("ingestor_unhandled_exception", error=str(e))
            await self.sentinel.emergency_shutdown_trigger(agent_profile.get("ip", "unknown"))
            raise e

    async def _fetch_last_crum(self) -> Optional[TAMVCrumEntity]:
        stmt = select(TAMVCrumEntity).order_by(desc(TAMVCrumEntity.created_at)).limit(1)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _verify_chain_link(self) -> bool:
        stmt = select(TAMVCrumEntity).order_by(desc(TAMVCrumEntity.created_at)).limit(2)
        result = await self.db.execute(stmt)
        records = result.scalars().all()

        if len(records) < 2:
            return True

        current, previous = records[0], records[1]
        if current.previous_hash != previous.integrity_hash:
            logger.error(
                "chain_link_mismatch",
                current_id=current.id,
                expected=previous.integrity_hash,
                got=current.previous_hash,
            )
            return False
        return True

    async def _trigger_emergency_protocol(self, reason: str, severity: float, source: str):
        event_payload = {
            "status": "CRITICAL",
            "threatLevel": severity,
            "lastEvent": f"SECURITY_BREACH: {reason} at {source}",
            "timestamp": datetime.now(timezone.utc).timestamp(),
        }
        await self.redis.publish("anubis:crisis_channel", json.dumps(event_payload))
        await self.sentinel.log_attempt("INTERNAL_SYSTEM", success=False, reason=reason)
        logger.critical("EMERGENCY_PROTOCOL_ACTIVATED", **event_payload)

    async def get_sovereign_stats(self) -> Dict[str, Any]:
        count_stmt = select(func.count(TAMVCrumEntity.id))
        res = await self.db.execute(count_stmt)
        total_crums = res.scalar() or 0
        last_crum = await self._fetch_last_crum()

        return {
            "ledger_height": total_crums,
            "integrity_status": "SECURE" if await self._verify_chain_link() else "BROKEN",
            "last_sync": datetime.now(timezone.utc).isoformat(),
            "last_crum_id": last_crum.id if last_crum else None,
            "last_hash": last_crum.integrity_hash if last_crum else None,
        }
