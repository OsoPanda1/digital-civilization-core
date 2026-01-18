"""
TAMV Sovereign Ledger - Core Entity Definition
Versión: 2.0.0 - Production Grade
Autor: Edwin Oswaldo Castillo Trejo (Root Creator)
Descripción: Definición de la entidad inmutable para el registro de Crums y eventos de soberanía.
"""

import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Any, Dict, Optional

from sqlalchemy import (
    Column, String, JSON, DateTime, Boolean, 
    Float, Index, Integer, Enum as SQLEnum,
    Text, ForeignKey, Computed
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.sql import func
from .base import Base

class VerificationLevel(str, Enum):
    BASIC = "basic"           # Firma estándar
    FEDERATED = "federated"   # Quórum de nodos
    QUANTUM = "quantum"       # Blindaje post-cuántico (Dilithium/Falcon)
    ROOT = "root"             # Acción directa del Creador (Edwin)

class RiskLevel(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"

class TAMVCrumEntity(Base):
    """
    Representación inmutable de una acción o pensamiento de Isabella
    vinculado a la soberanía del Creador.
    """
    __tablename__ = "tamv_crums_ledger"

    # --- IDENTIFICADORES ÚNICOS ---
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    # ULID o Snowflake ID alternativo para ordenamiento cronológico natural
    canonical_id = Column(String(64), unique=True, nullable=False, index=True)
    action_type = Column(String(64), nullable=False, index=True)

    # --- SOBERANÍA Y CRIPTOGRAFÍA DEL CREADOR ---
    creator_did = Column(String(255), nullable=False, index=True)
    creator_pubkey = Column(Text, nullable=False)  # PEM o formato JWK
    creator_signature = Column(Text, nullable=False)
    # El fingerprint permite validaciones rápidas sin procesar llaves completas
    creator_fingerprint = Column(String(64), nullable=False, index=True)
    
    # --- VALIDACIÓN DE INTEGRIDAD ---
    # Hash SHA-3/512 que encadena este Crum con el anterior (Blockchain-like)
    integrity_hash = Column(String(128), unique=True, nullable=False)
    parent_hash = Column(String(128), nullable=True, index=True)
    
    # --- SEGURIDAD AVANZADA (ANUBIS SENTINEL) ---
    risk_level = Column(SQLEnum(RiskLevel), default=RiskLevel.LOW, nullable=False, index=True)
    verification_level = Column(SQLEnum(VerificationLevel), default=VerificationLevel.BASIC, index=True)
    is_verified_by_root = Column(Boolean, default=False, nullable=False)
    is_quorum_verified = Column(Boolean, default=False)
    
    # Anclaje Cuántico (Firmas post-cuánticas integradas en el payload)
    quantum_signature = Column(Text, nullable=True)
    root_chain_anchor = Column(String(255), nullable=True, index=True) # TXID en MSR/BookPI

    # --- TELEMETRÍA EMOCIONAL (ECG/TAMV) ---
    # Almacenado en JSONB para aprovechar los índices GIN de PostgreSQL
    telemetry_data = Column(JSONB, nullable=False, server_default='{}')
    # Campos extraídos para analítica rápida
    ecg_intensity = Column(Float, nullable=True)
    ecg_entropy = Column(Float, nullable=True)
    ecg_pattern = Column(String(32), nullable=True, index=True)

    # --- PAYLOAD Y CONTEXTO ---
    payload = Column(JSONB, nullable=False)
    context_tags = Column(JSONB, nullable=True) # e.g., ["economy", "security", "xr"]
    
    # --- METADATOS DE SESIÓN Y ORIGEN ---
    session_id = Column(String(64), nullable=True, index=True)
    device_id = Column(String(128), nullable=True)
    ip_address = Column(String(45), nullable=True) # IPv4/IPv6

    # --- AUDITORÍA TEMPORAL (TIEMPOS DE PRECISIÓN) ---
    created_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False, 
        index=True
    )
    # Tiempo en que el servidor recibió y validó el evento
    ingested_at = Column(
        DateTime(timezone=True), 
        server_default=func.now(), 
        nullable=False
    )
    # Para eventos con caducidad legal o técnica
    expires_at = Column(DateTime(timezone=True), nullable=True)

    # --- REGLAS DE NEGOCIO Y CONTRICCIONES ---
    __table_args__ = (
        # Índice GIN para búsquedas ultra rápidas dentro de JSONB (tags y telemetría)
        Index("ix_tamv_crums_payload_gin", payload, postgresql_using="gin"),
        Index("ix_tamv_crums_tags_gin", context_tags, postgresql_using="gin"),
        
        # Índice compuesto para auditoría de soberanía por tiempo
        Index("ix_sovereignty_audit", creator_did, created_at, risk_level),
        
        # Garantizar que no existan colisiones de integridad
        {"comment": "Tabla maestra del Ledger Soberano de Isabella IA"}
    )

    def __repr__(self):
        return f"<TAMVCrum(id={self.id}, action={self.action_type}, risk={self.risk_level})>"

    @property
    def is_tampered(self) -> bool:
        """
        Lógica placeholder para verificar si el registro ha sido alterado.
        En una implementación real, esto recalcula el integrity_hash.
        """
        # TODO: Implementar validación cruzada con parent_hash
        return False
