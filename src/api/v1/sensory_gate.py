from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Header
from ...core.ingestor import SovereignIngestor
from ...security.anubis import AnubisSentinel

router = APIRouter(prefix="/v1/sinderesis")

@router.websocket("/vortex/{did}")
async def vortex_socket(
    websocket: WebSocket, 
    did: str, 
    ingestor: SovereignIngestor,
    anubis: AnubisSentinel
):
    """
    SINDÉRESIS-X VORTEX GATE.
    Recibe ráfagas binarias del SovereignController.
    """
    await websocket.accept()
    
    # Validar Identidad antes de permitir flujo sensorial
    if not await anubis.validate_id_nvida(did):
        await websocket.close(code=4003) # Unauthorized
        return

    try:
        while True:
            # Recepción de ráfaga binaria (Freq:Power:Type)
            burst = await websocket.receive_bytes()
            
            # Capa 2 & 4: Mapeo y Anclaje Inmutable
            crum_id = await ingestor.commit_crum(
                raw_data={"action": "SINDÉRESIS_BURST", "binary_burst": True, "raw_hex": burst.hex()},
                agent_profile={"ip": websocket.client.host, "trace_id": "VORTEX-STREAM"},
                creator_ctx={"did": did}
            )
            
            # Capa 7: Feedback instantáneo al Dashboard
            await websocket.send_json({
                "status": "SYNAPSE_SHIFT_COMPLETE",
                "crum_id": crum_id,
                "timestamp": datetime.now(timezone.utc).isoformat()
            })

    except WebSocketDisconnect:
        logger.info("VORTEX_DISCONNECTED", did=did)
