import React, { useMemo } from "react";
import { 
  Crown, 
  ShieldCheck, 
  Smartphone, 
  Fingerprint, 
  ShieldAlert 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Props robustas para el estatus de soberanía.
 * Soporta nulidad para evitar rupturas en tiempo de ejecución.
 */
interface SovereignStatusProps {
  isVerified: boolean;
  assuranceLevel?: "low" | "substantial" | "high" | null;
  deviceLabel?: string | null;
  creatorName?: string | null;
  creatorSignature?: string | null;
}

/**
 * Diccionario de estados con semántica civilizatoria.
 */
const ASSURANCE_MAP = {
  high: {
    label: "Nivel Máximo: Biometría Raíz",
    styles: "from-green-500/20 border-green-500/40 text-green-300",
    icon: Fingerprint,
  },
  substantial: {
    label: "2FA + Dispositivo Confiable",
    styles: "from-blue-500/20 border-blue-500/40 text-blue-300",
    icon: Smartphone,
  },
  low: {
    label: "Sesión Básica Verificada",
    styles: "from-amber-500/20 border-amber-500/40 text-amber-300",
    icon: ShieldCheck,
  },
};

export const SovereignStatus: React.FC<SovereignStatusProps> = ({
  isVerified,
  assuranceLevel,
  deviceLabel,
  creatorName = "Edwin Castillo",
  creatorSignature,
}) => {
  // 1. Lógica de seguridad: Si no está verificado, el componente es invisible (Zero Trust)
  if (!isVerified) return null;

  // 2. Fallback de nivel: Si no se especifica, asumimos 'low' por seguridad
  const config = ASSURANCE_MAP[assuranceLevel || "low"];
  const StatusIcon = config.icon;

  // 3. Limpieza de firma: Mostrar solo los extremos para trazabilidad visual limpia
  const displaySignature = useMemo(() => {
    const sig = creatorSignature?.trim();
    if (!sig) return null;
    return sig.length > 16 
      ? `${sig.slice(0, 8)}...${sig.slice(-8)}` 
      : sig;
  }, [creatorSignature]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Ease-out quint para suavidad premium
        role="status"
        aria-label={`Estatus de soberanía de ${creatorName}`}
        className={`flex items-center gap-4 px-5 py-2.5 bg-gradient-to-r to-transparent border backdrop-blur-md rounded-2xl shadow-2xl ${config.styles}`}
      >
        {/* Indicador de Corona: Pulso de Soberanía */}
        <div className="relative shrink-0">
          <Crown size={16} className="relative z-10 animate-pulse" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-current rounded-full blur-md"
          />
        </div>

        <div className="flex flex-col min-w-0 border-l border-current/20 pl-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black tracking-tighter uppercase truncate italic">
              Soberanía {creatorName}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-0.5 opacity-80">
            <span className="text-[8px] uppercase tracking-[0.15em] font-bold flex items-center gap-1.5">
              <StatusIcon size={10} />
              {config.label}
            </span>

            {deviceLabel && (
              <span className="text-[8px] flex items-center gap-1 border-l border-current/20 pl-2">
                <Smartphone size={9} className="opacity-60" />
                {deviceLabel}
              </span>
            )}

            {displaySignature && (
              <span className="hidden sm:inline text-[7px] font-mono bg-black/20 px-1.5 py-0.5 rounded border border-current/10">
                HASH: {displaySignature}
              </span>
            )}
          </div>
        </div>

        {/* Escudo de validación final */}
        <div className="shrink-0 ml-2">
          {assuranceLevel === "high" ? (
            <ShieldCheck size={18} className="text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
          ) : (
            <ShieldAlert size={18} className="opacity-50" />
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
