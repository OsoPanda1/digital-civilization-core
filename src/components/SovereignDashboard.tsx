import React, { useEffect, useState } from 'react';

export const SovereignDashboard = () => {
    const [status, setStatus] = useState("DISCONNECTED");
    const [sensoryTemp, setSensoryTemp] = useState(0);

    // Listener del bus de eventos de ANUBIS
    useEffect(() => {
        const ws = new WebSocket("ws://api.tamv.online/v1/sinderesis/vortex/did:tamv:edwin");
        ws.onopen = () => setStatus("CONNECTED_Sovereign_Link");
        ws.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if(data.sensory_temp) setSensoryTemp(data.sensory_temp);
        };
    }, []);

    return (
        <div className="bg-black text-white p-10 min-h-screen font-mono">
            <header className="border-b border-magenta-500 pb-4 mb-10 flex justify-between items-center">
                <h1 className="text-2xl font-black tracking-tighter">TAMV MD-X4 // SINDÉRESIS-X</h1>
                <div className={`px-4 py-1 rounded-full text-[10px] ${status.includes("CONNECTED") ? "bg-green-500" : "bg-red-500"}`}>
                    {status}
                </div>
            </header>

            <div className="grid grid-cols-12 gap-6">
                {/* Monitor de Temperatura de Conciencia */}
                <div className="col-span-4 bg-slate-900 p-6 rounded-3xl border border-white/10">
                    <span className="text-[10px] text-magenta-500 uppercase">Sensory Temperature</span>
                    <div className="text-6xl font-black my-4">{(sensoryTemp * 100).toFixed(1)}%</div>
                    <div className="h-1 bg-white/5 w-full rounded-full overflow-hidden">
                        <div className="h-full bg-magenta-500 transition-all" style={{width: `${sensoryTemp * 50}%`}} />
                    </div>
                </div>

                {/* Radar de Crisis Anubis */}
                <div className="col-span-8 bg-slate-900 p-6 rounded-3xl border border-red-500/20">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] text-red-500 uppercase">Anubis Sentinel Radar</span>
                        <div className="animate-pulse h-2 w-2 bg-red-500 rounded-full" />
                    </div>
                    <div className="h-32 bg-black/40 rounded-xl flex items-center justify-center border border-white/5">
                        <span className="text-[8px] text-white/20 uppercase tracking-[1em]">Scanning Integrity...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
