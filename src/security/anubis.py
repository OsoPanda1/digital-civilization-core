import json
import structlog
from redis.asyncio import Redis
from datetime import datetime, timezone

logger = structlog.get_logger("tamv.security")

class AnubisSentinel:
    def __init__(self, redis: Redis):
        self.redis = redis
        self.ROOT_DID = "did:tamv:edwin-oswaldo-castillo-trejo"
        self.CRISIS_CHANNEL = "anubis:crisis_channel"

    async def validate_id_nvida(self, did: str) -> bool:
        """Verifica si el ejecutor es el Arquitecto Raíz."""
        is_root = (did == self.ROOT_DID)
        if not is_root:
            await self.emergency_shutdown_trigger(f"UNAUTHORIZED_ACCESS_ATTEMPT: {did}")
        return is_root

    async def emergency_shutdown_trigger(self, reason: str):
        """Protocolo de muerte y renacimiento (Capa 5)."""
        payload = {
            "status": "LOCKDOWN",
            "threatLevel": 100.0,
            "lastEvent": f"FORCE_SHUTDOWN: {reason}",
            "timestamp": datetime.now(timezone.utc).timestamp()
        }
        await self.redis.publish(self.CRISIS_CHANNEL, json.dumps(payload))
        logger.critical("ANUBIS_LOCKDOWN_ACTIVATED", reason=reason)

    async def log_attempt(self, ip: str, success: bool, reason: str = None):
        """Gestiona la reputación de IP en el bus de eventos."""
        key = f"anubis:reputation:{ip}"
        score = await self.redis.incrbyfloat(key, -1.5 if success else 15.0)
        await self.redis.expire(key, 3600)
        if score > 75.0:
            await self._broadcast_crisis(ip, score)

    async def _broadcast_crisis(self, ip: str, score: float):
        await self.redis.publish(self.CRISIS_CHANNEL, json.dumps({
            "status": "CRITICAL",
            "threatLevel": score,
            "lastEvent": f"HIGH_RISK_DETECTED: {ip}"
        }))
