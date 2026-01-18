import json
import hashlib
import uuid
import struct
import structlog
from datetime import datetime, timezone
from typing import Dict, Any, Optional

from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc, func
from sqlalchemy.exc import SQLAlchemyError

from ..models.sovereign_event import TAMVCrumEntity, RiskLevel
from ..security.anubis import AnubisSentinel

# Logger de grado militar para trazabilidad forense
logger = structlog.get_logger("tamv.ingestor")

class IntegrityError(Exception):
    """Falla crítica: La cadena de bloques del Ledger ha sido alterada."""
    pass

class SovereignIngestor:
    def __init__(self, db: AsyncSession, redis: Redis, sentinel: AnubisSentinel):
        self.db = db
        self.redis = redis
        self.sentinel = sentinel
        self.genesis_hash = "0" * 128  # SHA3-512 Initial State Genesis

    async def commit_crum(
        self,
        raw_data: Dict[str, Any],
        agent_profile: Dict[str, Any],
        creator_ctx: Dict[str, Any],
        verified_by_root: bool = False,
    ) -> str:
        """
        ANCLAJE SOBERANO: Procesa ráfagas sensoriales y datos críticos.
        Valida la integridad del Ledger antes de cada inserción.
        """
        log = logger.bind(
            trace_id=agent_profile.get("trace_id"),
            action=raw_data.get("action"),
            ip=agent_profile.get("ip"),
            creator=creator_ctx.get("did"),
        )

        try:
            # 1. CAPA DE SEGURIDAD: VERIFICACIÓN DE CADENA (Anti-Tampering)
            if not await self._verify_chain_link():
                await self._trigger_emergency_protocol(
                    reason="CHAIN_BREACH_DETECTED",
                    severity=100.0,
                    source="LEDGER_INTEGRITY",
                )
                raise IntegrityError("CRITICAL: Ledger chain link is broken. Ingestion halted.")

            # 2. CAPA DE IDENTIDAD: VALIDACIÓN NVIDA™
            if raw_data.get("action") == "SINDÉRESIS_BURST":
                if not await self.sentinel.validate_id_nvida(creator_ctx.get("did")):
                    await self._trigger_emergency_protocol("IDENTITY_FRAUD", 100.0, "VORTEX")
                    raise PermissionError("Soberanía de ID no verificada para ráfagas sensoriales.")

            # 3. RECUPERAR ANCLAJE (LAST HASH)
            last_crum = await self._fetch_last_crum()
            previous_hash = last_crum.integrity_hash if last_crum else self.genesis_hash

            # 4. CONSTRUCCIÓN CRIPTOGRÁFICA (SHA3-512 + SALT)
            crum_id = str(uuid.uuid4())
            timestamp = datetime.now(timezone.utc)
            
            # Tratamiento especial para ráfagas binarias si vienen en el payload
            if "binary_burst" in raw_data:
                # Inyección de Capa 2: Neuro-Shift calculation
                raw_data["sensory_temp"] = self._calculate_synapse_shift(
                    raw_data.get("freq", 0), 
                    raw_data.get("power", 0)
                )

            payload_json = json.dumps(raw_data, sort_keys=True, separators=(",", ":"))
            salt = agent_profile.get("trace_id", "") + str(uuid.uuid4())
            
            # El Hash de Integridad vincula: ID + Hash Anterior + Payload + Time + Salt
            checksum_context = f"{crum_id}|{previous_hash}|{payload_json}|{timestamp.isoformat()}|{salt}"
            integrity_hash = hashlib.sha3_512(checksum_context.encode("utf-8")).hexdigest()

            # 5. PREPARAR ENTIDAD SINDÉRESIS-X
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
                risk_level=(raw_data.get("risk") or "LOW").upper(),
                verified_by_root=verified_by_root,
                created_at=timestamp,
                non_repudiation_token=f"TAMV-CERT-{crum_id[:8]}",
            )

            # 6. PERSISTENCIA ATÓMICA (CAPA 4)
            self.db.add(new_crum)
            await self.db.flush()
            await self.db.commit()

            # 7. CAPA DE SALIDA: PROPAGACIÓN AL DREAMSPACE (REDIS)
            await self.redis.publish("anubis:crisis_channel", json.dumps({
                "status": "CRUM_ANCHORED",
                "type": raw_data.get("action"),
                "sensory_temp": raw_data.get("sensory_temp", 0),
                "integrity": integrity_hash[:16]
            }))

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
            # Disparar cierre de emergencia en ANUBIS
            await self.sentinel.emergency_shutdown_trigger(reason=str(e))
            raise e

    def _calculate_synapse_shift(self, f: float, p: float) -> float:
        """Traducción de ráfaga binaria a intensidad sensorial (Capa 2)."""
        return min((f * p) / 1000.0, 2.0)

    async def _fetch_last_crum(self) -> Optional[TAMVCrumEntity]:
        stmt = select(TAMVCrumEntity).order_by(desc(TAMVCrumEntity.created_at)).limit(1)
        result = await self.db.execute(stmt)
        return result.scalar_one_or_none()

    async def _verify_chain_link(self) -> bool:
        """Validación de coherencia retrospectiva de la cadena."""
        stmt = select(TAMVCrumEntity).order_by(desc(TAMVCrumEntity.created_at)).limit(2)
        result = await self.db.execute(stmt)
        records = result.scalars().all()

        if len(records) < 2:
            return True

        current, previous = records[0], records[1]
        if current.previous_hash != previous.integrity_hash:
            return False
        return True

    async def _trigger_emergency_protocol(self, reason: str, severity: float, source: str):
        """Propagación de señal de crisis a la interfaz táctica."""
        event_payload = {
            "status": "CRITICAL",
            "threatLevel": severity,
            "lastEvent": f"SECURITY_BREACH: {reason} at {source}",
            "timestamp": datetime.now(timezone.utc).timestamp(),
        }
        await self.redis.publish("anubis:crisis_channel", json.dumps(event_payload))
        logger.critical("EMERGENCY_PROTOCOL_ACTIVATED", **event_payload)

    async def get_sovereign_stats(self) -> Dict[str, Any]:
        """Dashboard Data: Estado de salud del Ledger."""
        count_stmt = select(func.count(TAMVCrumEntity.id))
        res = await self.db.execute(count_stmt)
        total_crums = res.scalar() or 0
        last_crum = await self._fetch_last_crum()

        return {
            "ledger_height": total_crums,
            "integrity_status": "SECURE" if await self._verify_chain_link() else "BROKEN",
            "last_sync": datetime.now(timezone.utc).isoformat(),
            "last_hash": last_crum.integrity_hash if last_crum else None,
        }
