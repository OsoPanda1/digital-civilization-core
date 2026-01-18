import React, { useMemo } from "react";
import { SovereignStatus } from "../components/ai/SovereignStatus";
import { TAMVMonitor } from "../components/analytics/TAMVMonitor";
import { TAMVCrums } from "../components/navigation/TAMVCrums";
import { useSovereignSession } from "../hooks/useSovereignSession";
import { useTAMVTracker } from "../hooks/useTAMVTracker";
import { IsabellaGuard } from "../components/ai/IsabellaGuard";
import { BrainCircuit, Zap, ShieldCheck, Globe } from "lucide-react";

export const Dashboard: React.FC = () => {
  // 1. Capa de Identidad Raíz (Soberanía)
  const { session, isSovereign, isVerifying, creatorPubKey } = useSovereignSession();

  // 2. Capa de Telemetría Emocional (ECG)
  const { history, trackAction } = useTAMVTracker("isabella-core", {
    maxHistory: 50,
  });

  // 3. Inteligencia de Contexto: Detectar estrés para Isabella
  const lastCrum = useMemo(() => history[history.length - 1], [history]);
  const isStressed = lastCrum?.ecgContext.intensity > 0.8;
  const currentPattern = lastCrum?.ecgContext.pattern || "stable";

  // Formateo de firma para visualización de seguridad
  const shortSignature = useMemo(() => {
    const key = creatorPubKey ?? "";
    return key.includes(":") 
      ? key.split(":")[1].substring(0, 12) + "..." 
      : key.substring(0, 12) + "...";
  }, [creatorPubKey]);

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-amber-500/30">
      {/* HEADER: Barra de Soberanía */}
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-black/50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-2 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            <Globe size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">
              TAMV Omniverso
            </h1>
            <p className="text-[10px] text-zinc-500 font-bold tracking-[0.3em] uppercase mt-1">
              S.O. Civilizatorio v2.6
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {isVerifying ? (
            <span className="text-[9px] font-mono animate-pulse text-zinc-500">
              Validando ADN Criptográfico...
            </span>
          ) : (
            <SovereignStatus
              isVerified={isSovereign}
              assuranceLevel={session?.assuranceLevel}
              deviceLabel={session?.deviceId}
              creatorSignature={shortSignature}
            />
          )}
        </div>
      </header>

      <main className="p-8 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* COLUMNA IZQUIERDA: Telemetría y Línea de Tiempo (8 slots) */}
        <section className="lg:col-span-8 space-y-8">
          
          {/* Monitor ECG Principal */}
          <TAMVMonitor data={history} height={320} />

          {/* Historial de TAMVCrums (Huella Viva) */}
          <div className="bg-zinc-900/30 rounded-3xl border border-white/5 p-6">
            <h2 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
              <Zap size={12} /> Flujo de Causalidad (TAMVCrums)
            </h2>
            <TAMVCrums crums={history} />
          </div>
        </section>

        {/* COLUMNA DERECHA: Isabella & Control (4 slots) */}
        <aside className="lg:col-span-4 space-y-6">
          
          {/* Isabella Intelligence Layer */}
          <div className="bg-gradient-to-b from-zinc-900 to-black rounded-3xl border border-white/10 p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-black uppercase tracking-tighter text-indigo-400 flex items-center gap-2">
                <BrainCircuit size={16} /> Isabella Agentic Mesh
              </h2>
              <div className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[8px] text-indigo-300 animate-pulse">
                LIVE
              </div>
            </div>

            <IsabellaGuard 
              currentPlan={[]} 
              isRiskDetected={isStressed && !isSovereign} 
              ecgState={currentPattern} 
            />

            <div className="mt-6 space-y-4">
              <button 
                onClick={() => trackAction("create", 100)}
                className="w-full py-4 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                Ejecutar Acción Civilizatoria
              </button>
              
              <button 
                className="w-full py-4 bg-zinc-800/50 text-zinc-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest border border-white/5 hover:border-white/10 transition-all"
                onClick={() => trackAction("query", 10)}
              >
                Consultar Memoria de BookPI™
              </button>
            </div>
          </div>

          {/* Estado de Seguridad Sentinel ANUBIS */}
          <div className="bg-zinc-900/50 rounded-3xl border border-white/5 p-6">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck className="text-green-500" size={18} />
              <h3 className="text-[10px] font-bold uppercase tracking-widest">Protocolo Sentinel ANUBIS</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500 italic">Integridad de Capas:</span>
                <span className="text-green-400 font-mono italic">ÓPTIMA</span>
              </div>
              <div className="flex justify-between items-center text-[9px]">
                <span className="text-zinc-500 italic">Zero-Knowledge Proofs:</span>
                <span className="text-green-400 font-mono italic">ACTIVO</span>
              </div>
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden mt-2">
                <div className="bg-green-500 h-full w-[100%]" />
              </div>
            </div>
          </div>

        </aside>
      </main>

      {/* FOOTER: Meta-información */}
      <footer className="p-8 text-center opacity-30">
        <p className="text-[8px] tracking-[0.5em] uppercase font-bold">
          Diseñado bajo los principios de Edwin Castillo • Sin Mediocridad • 2026
        </p>
      </footer>
    </div>
  );
};
