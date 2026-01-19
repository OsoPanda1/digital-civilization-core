import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Target, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos para TAMV Crums
type EcgPattern = "focused" | "stable" | "overloaded" | "scattered";

interface EcgContext {
  pattern: EcgPattern;
  intensity: number;
}

interface Impact {
  credits: number;
}

interface TAMVCrum {
  id: string;
  module: string;
  ecgContext: EcgContext;
  impact: Impact;
}

interface TAMVCrumsProps {
  crums: TAMVCrum[];
  onCrumClick?: (crum: TAMVCrum) => void;
}

export const TAMVCrums: React.FC<TAMVCrumsProps> = ({ crums, onCrumClick }) => {
  
  const getPatternConfig = (pattern: EcgPattern) => {
    switch (pattern) {
      case "focused": return { color: "text-amber-400", icon: Target, label: "Foco Profundo" };
      case "stable": return { color: "text-blue-400", icon: Activity, label: "Estado Estable" };
      case "overloaded": return { color: "text-red-400", icon: Zap, label: "Saturación" };
      case "scattered": return { color: "text-purple-400", icon: Brain, label: "Dispersión" };
    }
  };

  return (
    <nav className="flex items-center space-x-2 py-4 px-6 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
      {crums.map((crum, index) => {
        const config = getPatternConfig(crum.ecgContext.pattern);
        const Icon = config.icon;

        return (
          <React.Fragment key={crum.id}>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative flex items-center"
              onClick={() => onCrumClick?.(crum)}
            >
              {/* Nodo del Crum */}
              <div className={cn(
                "flex items-center gap-2 cursor-pointer transition-all duration-300",
                "hover:scale-105"
              )}>
                <div className={cn("p-1.5 rounded-full bg-white/5 border border-white/10", config.color)}>
                  <Icon size={14} />
                </div>
                <span className="text-xs font-medium text-white/70 group-hover:text-white uppercase tracking-widest">
                  {crum.module}
                </span>
              </div>

              {/* Tooltip del ECG Emocional (El Espejo Suave) */}
              <div className="absolute bottom-full mb-3 hidden group-hover:block w-48 p-3 bg-zinc-900 border border-white/20 rounded-xl shadow-2xl z-50">
                <p className="text-[10px] text-zinc-400 mb-1">{config.label}</p>
                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${crum.ecgContext.intensity * 100}%` }}
                    className={cn("h-full", config.color.replace('text', 'bg'))}
                  />
                </div>
                <p className="text-[9px] mt-2 text-zinc-500 italic">
                  Impacto: +{crum.impact.credits} créditos
                </p>
              </div>
            </motion.div>

            {index < crums.length - 1 && (
              <span className="text-white/20 text-xs">/</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export type { TAMVCrum, EcgPattern, EcgContext, Impact };
