/**
 * Radar de Crisis: Visualización Táctica de ANUBIS.
 * Implementa un buffer de eventos para evitar parpadeo y asegurar fluidez.
 */
import { useAnubisSecurity } from '@/hooks/useAnubisSecurity';
import { motion, AnimatePresence } from 'framer-motion';

export const CrisisTacticalUnit = () => {
    const { state, securityStatus } = useAnubisSecurity();

    return (
        <div className="relative p-1 overflow-hidden rounded-[2.5rem] bg-black border border-white/10">
            {/* Overlay de Interferencia Cuántica en Crisis */}
            <AnimatePresence>
                {securityStatus === 'CRITICAL' && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 pointer-events-none bg-red-950/20 backdrop-invert-[0.1] mix-blend-overlay"
                    />
                )}
            </AnimatePresence>

            <div className="bg-slate-950 p-6 rounded-[2.4rem] space-y-4">
                <header className="flex justify-between">
                    <span className="text-[10px] font-black tracking-widest text-red-500 uppercase">
                        Crisis Monitor // {state.status}
                    </span>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`h-1 w-4 rounded-full ${i < (state.threatLevel/20) ? 'bg-red-600' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </header>

                {/* Mapa de Amenazas Dinámico */}
                <div className="h-48 w-full bg-black/50 rounded-2xl border border-red-900/30 relative flex items-center justify-center">
                    <div className={`absolute inset-0 bg-[radial-gradient(circle,rgba(153,27,27,0.2)_0%,transparent_70%)] ${state.status === 'CRITICAL' ? 'animate-pulse' : ''}`} />
                    <span className="text-[8px] font-mono text-red-500/60 uppercase">Inbound Force Vectors</span>
                    
                    {/* Visualización de la IP atacante */}
                    {state.status === 'CRITICAL' && (
                        <div className="absolute bottom-4 left-4 font-mono text-[9px] text-red-400 bg-red-950/50 px-2 py-1 rounded">
                            SRC_IP: {state.lastEvent.split('from')[1] || 'DETECTING...'}
                        </div>
                    )}
                </div>

                <button 
                    disabled={securityStatus !== 'CRITICAL'}
                    className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.4em] transition-all 
                        ${securityStatus === 'CRITICAL' 
                            ? 'bg-red-600 text-white shadow-[0_0_30px_rgba(220,38,38,0.5)] cursor-pointer' 
                            : 'bg-white/5 text-white/20 cursor-not-allowed'}`}
                >
                    {securityStatus === 'LOCKDOWN' ? 'SYSTEM_LOCKED' : 'Execute Phoenix Protocol'}
                </button>
            </div>
        </div>
    );
};
