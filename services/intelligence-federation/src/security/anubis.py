"""
ANUBIS Sentinel: Real-time Threat Intelligence & Response.
Gestiona el estado de crisis y propaga alertas via WebSockets/Redis.
"""
from typing import Dict, Any, Optional
import time
import structlog
from redis.asyncio import Redis

logger = structlog.get_logger("tamv.anubis")

class AnubisSentinel:
    def __init__(self, redis: Redis):
        self.redis = redis
        self.THREAT_THRESHOLD = 75.0  # Umbral para Modo Crisis (Rojo Sangre)
        self.LOCKDOWN_THRESHOLD = 95.0 # Umbral para Cierre Total

    async def log_attempt(self, ip: str, success: bool, reason: Optional[str] = None):
        """Registra intentos y calcula el Risk Index en tiempo real."""
        key = f"anubis:reputation:{ip}"
        if not success:
            # Incremento exponencial de riesgo por fallo
            current_risk = await self.redis.incrbyfloat(key, 12.5)
            await self.redis.expire(key, 3600) # TTL de 1 hora para enfriamiento
            
            if current_risk >= self.THREAT_THRESHOLD:
                await self._broadcast_crisis(ip, "BRUTE_FORCE_DETECTED", current_risk)
        else:
            # Decay lento de riesgo en intentos exitosos (reputación positiva)
            await self.redis.incrbyfloat(key, -1.0)

    async def _broadcast_crisis(self, source_ip: str, alert_type: str, severity: float):
        """Propaga el estado de crisis a través del bus de eventos."""
        event = {
            "status": "CRITICAL" if severity < self.LOCKDOWN_THRESHOLD else "LOCKDOWN",
            "threatLevel": min(severity, 100),
            "lastEvent": f"{alert_type} from {source_ip}",
            "timestamp": time.time()
        }
        # Publicar en el canal global para que el WebSocket lo tome
        await self.redis.publish("anubis:crisis_channel", json.dumps(event))
        logger.critical("ANUBIS_CRISIS_SIGNAL_EMITTED", **event)
