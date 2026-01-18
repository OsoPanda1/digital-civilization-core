import React from "react";
import {
  Crown,
  ShieldCheck,
  Smartphone,
  Fingerprint,
} from "lucide-react";
import { motion } from "framer-motion";

interface SovereignStatusProps {
  isVerified: boolean;
  assuranceLevel?: "low" | "substantial" | "high";
  deviceLabel?: string;
  creatorName?: string; // Nuevo campo para mostrar al creador
  creatorSignature?: string; // Huella digital inmutable
}

const assuranceText: Record<
  NonNullable<SovereignStatusProps["assuranceLevel"]>,
  string
> = {
  low: "Sesión verificada",
  substantial: "2FA + dispositivo confiable",
  high: "Nivel máximo: biometría raíz",
};

export const SovereignStatus: React.FC<SovereignStatusProps> = ({
  isVerified,
  assuranceLevel,
  deviceLabel,
  creatorName = "Edwin Castillo",
  creatorSignature,
}) => {
  if (!isVerified) return null;

  const label =
    assuranceLevel && assuranceText[assuranceLevel]
      ? assuranceText[assuranceLevel]
      : "Sesión verificada";

  const levelColor =
    assuranceLevel === "high"
      ? "from-green-500/20 border-green-500/40 text-green-300"
      : assuranceLevel === "substantial"
      ? "from-blue-500/20 border-blue-500/40 text-blue-300"
      : "from-amber-500/20 border-amber-500/40 text-amber-300";

  return (
    <motion.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="status"
      aria-label={`Estado de soberanía de ${creatorName}`}
      className={`flex items-center gap-3 px-4 py-2 bg-gradient-to-r to-transparent rounded-xl ${levelColor}`}
    >
      <Crown size={14} className="shrink-0 animate-pulse" />
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-black tracking-tighter uppercase truncate">
          Soberanía {creatorName}
        </span>
        {creatorSignature && (
          <span className="text-[7px] opacity-60 truncate">
            Huella: {creatorSignature}
          </span>
        )}
        <div className="flex flex-wrap gap-2 items-center opacity-80">
          <span className="text-[8px] uppercase tracking-widest italic font-bold flex items-center gap-1">
            {assuranceLevel === "high" && <Fingerprint size={8} />}
            {label}
          </span>
          {deviceLabel && (
            <span className="text-[8px] flex items-center gap-1">
              <Smartphone size={8} />
              {deviceLabel}
            </span>
          )}
        </div>
      </div>
      <ShieldCheck size={16} className="shrink-0" />
    </motion.div>
  );
};
