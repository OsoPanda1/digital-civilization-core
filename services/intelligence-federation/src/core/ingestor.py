"""
TAMV Sovereign Ingestor - Production Core
Blindaje de integridad para el Ledger Civilizatorio.
"""

import hashlib
import json
import logging
from datetime import datetime, timezone
from uuid import uuid4
from typing import Any, Dict, List, Optional, Tuple

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy import select

# Asumiendo que el modelo profesional anterior está en .models
from ..models.sovereign_event import TAMVCrumEntity, RiskLevel, VerificationLevel

# Configuración de Logging Estructurado
logger = logging.getLogger("tamv.ingestor")

class SovereignIngestor:
    """
    Motor de ingesta inmutable. 
    Asegura que cada bit de información esté vinculado criptográficamente 
    al Creador antes de tocar el disco.
    """

    def __init__(self, db_session: AsyncSession) -> None:
        self.db = db_session

    async def commit_crum(
        self,
        payload: Dict[str, Any],
        creator_ctx: Dict[str, Any],
        verification_source: VerificationLevel = VerificationLevel.BASIC
    ) -> str:
        """
        Punto de entrada único para la persistencia soberana.
        """
        try:
            # 1. Validación de Contrato de Datos
            self._validate_inputs(payload, creator_ctx)
            
            # 2. Saneamiento y Normalización
            safe_payload = self._sanitize(payload)
            risk = self._resolve_risk(safe_payload)
            
            # 3. Generación de Identidad y Huella (Fingerprint)
            pubkey = creator_ctx["pubkey"]
            did = creator_ctx["did"]
            fingerprint = self._generate_fingerprint(pubkey, did)

            # 4. Cálculo de Integridad de Cadena (Merkle Root Link)
            # Obtenemos el hash del último evento para encadenar (Inmutabilidad)
            parent_hash = await self._get_last_integrity_hash()
            integrity_hash = self._compute_integrity_hash(safe_payload, did, parent_hash)

            # 5. Construcción de Entidad Profesional
            new_crum = TAMVCrumEntity(
                id=uuid4(),
                canonical_id=f"TAMV-{datetime.now(timezone.utc).strftime('%Y%m%d')}-{uuid4().hex[:8]}",
                action_type=safe_payload.get("action", "undefined").upper(),
                
                # Soberanía
                creator_did=did,
                creator_pubkey=pubkey,
                creator_signature=creator_ctx["signature"],
                creator_fingerprint=fingerprint,
                is_verified_by_root=(verification_source == VerificationLevel.ROOT),
                
                # Integridad
                integrity_hash=integrity_hash,
                parent_hash=parent_hash,
                
                # Riesgo y Seguridad
                risk_level=risk,
                verification_level=verification_source,
                quantum_signature=payload.get("quantum_sig"),
                
                # Telemetría
                telemetry_data=payload.get("telemetry", {}),
                ecg_intensity=self._clamp(payload.get("ecg_intensity"), 0.0, 1.0),
                ecg_entropy=self._clamp(payload.get("ecg_entropy"), 0.0, 1.0),
                ecg_pattern=payload.get("ecg_pattern", "stable"),
                
                # Datos
                payload=safe_payload,
                context_tags=payload.get("tags", []),
                device_id=creator_ctx.get("device_id"),
                session_id=creator_ctx.get("session_id")
            )

            # 6. Transacción Atómica
            self.db.add(new_crum)
            await self.db.commit()
            
            logger.info(f"CRUM_COMMITTED: {new_crum.canonical_id} | Risk: {risk} | Integrity: {integrity_hash[:12]}")
            return str(new_crum.id)

        except IntegrityError:
            await self.db.rollback()
            logger.error("INTEGRITY_COLLISION: Hash duplicado o violación de cadena.")
            raise ValueError("Collision detected in sovereign chain.")
        except Exception as e:
            await self.db.rollback()
            logger.critical(f"INGESTION_FAILED: {str(e)}")
            raise

    def _validate_inputs(self, payload: Dict, ctx: Dict):
        """Validación de esquema mínima requerida."""
        required_ctx = ["did", "pubkey", "signature"]
        if not all(k in ctx for k in required_ctx):
            raise ValueError(f"Missing security context: {required_ctx}")
        if "action" not in payload:
            raise ValueError("Payload must define an action_type")

    def _sanitize(self, data: Dict) -> Dict:
        """Elimina ruido y datos sensibles del payload."""
        blacklist = {"password", "token", "secret", "private_key"}
        return {k: v for k, v in data.items() if k.lower() not in blacklist}

    def _resolve_risk(self, payload: Dict) -> RiskLevel:
        """Lógica de clasificación de riesgo de última instancia."""
        action = payload.get("action", "").lower()
        if any(word in action for word in ["delete", "purge", "withdraw", "root"]):
            return RiskLevel.CRITICAL
        if any(word in action for word in ["update", "transfer"]):
            return RiskLevel.HIGH
        return RiskLevel.LOW

    def _compute_integrity_hash(self, payload: Dict, did: str, parent: Optional[str]) -> str:
        """Genera un hash SHA-3 512 encadenado."""
        content = json.dumps(payload, sort_keys=True)
        salt = f"{did}|{parent or 'GENESIS'}"
        return hashlib.sha3_512(f"{content}{salt}".encode()).hexdigest()

    def _generate_fingerprint(self, pubkey: str, did: str) -> str:
        """Fingerprint determinista para búsquedas rápidas."""
        return hashlib.blake2b(f"{pubkey}{did}".encode(), digest_size=16).hexdigest()

    async def _get_last_integrity_hash(self) -> Optional[str]:
        """Obtiene el último hash de la tabla para el encadenamiento."""
        result = await self.db.execute(
            select(TAMVCrumEntity.integrity_hash).order_by(TAMVCrumEntity.created_at.desc()).limit(1)
        )
        return result.scalar_one_or_none()

    @staticmethod
    def _clamp(val: Any, min_v: float, max_v: float) -> float:
        try:
            return max(min_v, min(max_v, float(val)))
        except (TypeError, ValueError):
            return 0.0
