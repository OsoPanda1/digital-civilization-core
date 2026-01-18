from datetime import datetime, timezone
from typing import Any, Dict, Literal, List
import uuid

from fastapi import APIRouter, Depends, HTTPException, status, Request
from pydantic import BaseModel, Field, ConfigDict, conlist, constr
from sqlalchemy.ext.asyncio import AsyncSession

from ...core.ingestor import SovereignIngestor
from ...core.auth import get_verified_creator
from ...database import get_db
from ...security import anubis
import structlog

# Logger estructurado con contexto inyectado de fábrica
logger = structlog.get_logger("tamv.gate")

router = APIRouter(prefix="/isabella", tags=["Sovereignty"])

# ====== Modelos de Datos de Grado Militar (Pydantic V2) ======

class SovereignPayload(BaseModel):
    """Payload blindado: No se permite ni un solo byte de información no autorizada."""
    model_config = ConfigDict(
        extra="forbid", 
        populate_by_name=True,
        str_strip_whitespace=True
    )

    action: str = Field(..., min_length=1, max_length=128, pattern=r"^[A-Z0-9_]+$")
    ecg: Dict[str, Any] | None = Field(default=None, description="Telemetría emocional agregada en el Edge")
    tags: List[constr(max_length=32)] = Field(default_factory=list, max_length=20)
    risk: Literal["low", "medium", "high", "critical"] = "low"
    quantum_sig: str | None = Field(default=None, min_length=64, max_length=2048)
    data: Dict[str, Any] | None = None

class CreatorContext(BaseModel):
    """Contexto de Identidad Soberana extraído de la firma Ed25519."""
    model_config = ConfigDict(str_strip_whitespace=True)

    did: str = Field(..., min_length=3, max_length=255)
    pubkey: str = Field(..., min_length=16, max_length=512)
    signature: str = Field(..., min_length=32, max_length=1024)
    device_id: str = Field(default="ROOT_CONSOLE", max_length=128)
    assurance_level: Literal["low", "substantial", "high"] = "low"

# ====== Lógica de Despacho (Dispatch) ======

@router.post(
    "/dispatch",
    status_code=status.HTTP_201_CREATED,
    summary="Anclaje de acción soberana en el Ledger Civilizatorio",
    responses={
        429: {"description": "ANUBIS: Intrusión detectada o límite excedido"},
        401: {"description": "Falla de integridad criptográfica en la firma"},
        500: {"description": "Colapso del sistema de persistencia inmutable"}
    },
)
async def dispatch_sovereign_action(
    request: Request,
    payload: SovereignPayload,
    creator_ctx: CreatorContext = Depends(get_verified_creator),
    db: AsyncSession = Depends(get_db),
):
    """
    Punto de entrada de alta presión para Isabella IA.
    Coordina la validación de identidad, el escudo ANUBIS y la persistencia inmutable.
    """
    ingestor = SovereignIngestor(db)
    client_ip = request.client.host if request.client else "unknown"
    
    # Correlación única para trazabilidad en microservicios
    trace_id = request.headers.get("x-trace-id", str(uuid.uuid4()))
    request_id = str(uuid.uuid4())

    # 1. ESCUDO ANUBIS: Verificación de Reputación e IP
    if not anubis.is_ip_allowed(client_ip):
        logger.warning("ANUBIS_INTERCEPTION", 
            ip=client_ip, action=payload.action, trace_id=trace_id, reason="Blacklisted or RateLimited")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="access_denied_by_anubis_sentinel",
        )

    try:
        # 2. PERFIL DE AGENTE (Metadatos de Auditoría)
        agent_profile = {
            "ip": client_ip,
            "ua": request.headers.get("user-agent"),
            "trace_id": trace_id,
            "request_id": request_id,
            "timestamp": datetime.now(timezone.utc).timestamp()
        }

        # 3. COMPROMISO EN EL LEDGER (Inmutabilidad)
        # Solo se permite la ingesta si el contexto del creador es verificado
        crum_id = await ingestor.commit_crum(
            raw_data=payload.model_dump(),
            agent_profile=agent_profile,
            creator_ctx=creator_ctx.model_dump(),
            verified_by_root=(creator_ctx.assurance_level == "high"),
        )

        # 4. LOG ESTRUCTURADO PARA SIEM/AUDITORÍA
        logger.info(
            "sovereign_action_anchored",
            id=crum_id,
            action=payload.action,
            creator=creator_ctx.did,
            risk=payload.risk,
            assurance=creator_ctx.assurance_level,
            trace_id=trace_id,
            request_id=request_id
        )

        # 5. RESPUESTA DE NO-REPUDIO
        return {
            "status": "ANCHORED",
            "crum_id": crum_id,
            "index_timestamp": datetime.now(timezone.utc).isoformat(),
            "telemetry": {
                "trace_id": trace_id,
                "request_id": request_id,
                "anubis_status": "CLEAN"
            },
            "integrity": {
                "risk_score": payload.risk,
                "layer": "quantum" if payload.quantum_sig else "standard",
                "non_repudiation_token": f"TAMV-CERT-{crum_id[:8]}",
                "creator_did": creator_ctx.did,
            },
        }

    except ValueError as e:
        # Violación de reglas de negocio o hash: Notificar a la red de defensa
        anubis.log_violation(client_ip, reason=str(e))
        logger.error("integrity_breach_detected", ip=client_ip, error=str(e), trace_id=trace_id)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"integrity_validation_error: {str(e)}",
        )

    except Exception as e:
        # Falla de infraestructura: Phoenix Protocol™ activado
        anubis.register_critical_failure(client_ip, error=str(e))
        logger.critical("LEDGER_FATAL_ERROR", error=str(e), action=payload.action, trace_id=trace_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="critical_infrastructure_failure",
        )
