import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { TAMVCrum, EcgPattern } from "@tamv/shared-types";
import { motion } from "framer-motion";

interface TAMVMonitorProps {
  data: TAMVCrum[];
  height?: number;
}

type ChartPoint = {
  time: string;
  intensity: number;
  pattern: EcgPattern | string;
  impact: number;
  module: string;
};

const PATTERNS: EcgPattern[] = [
  "stable",
  "focused",
  "overloaded",
  "scattered",
];

const getPatternColor = (pattern: EcgPattern | string): string => {
  switch (pattern) {
    case "focused": return "#fbbf24"; // dorado
    case "overloaded": return "#f87171"; // rojo
    case "scattered": return "#c084fc"; // violeta
    case "stable":
    default: return "#60a5fa"; // azul
  }
};

export const TAMVMonitor: React.FC<TAMVMonitorProps> = ({
  data,
  height = 260,
}) => {
  const chartData = useMemo<ChartPoint[]>(
    () =>
      data.map((crum) => ({
        time: new Date(crum.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        intensity: Math.min(100, Math.max(0, crum.ecgContext.intensity * 100)),
        pattern: crum.ecgContext.pattern,
        impact: crum.impact.credits,
        module: crum.module,
      })),
    [data]
  );

  const dominantPattern = useMemo<EcgPattern | "stable">(() => {
    if (!data.length) return "stable";
    const counts: Record<string, number> = {};
    for (const c of data) {
      counts[c.ecgContext.pattern] = (counts[c.ecgContext.pattern] ?? 0) + 1;
    }
    return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "stable") as EcgPattern | "stable";
  }, [data]);

  const strokeColor = getPatternColor(dominantPattern);

  if (!chartData.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full h-48 bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex items-center justify-center"
      >
        <p className="text-xs text-zinc-500 tracking-widest uppercase">Esperando señal de huella viva...</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-zinc-950/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 overflow-hidden shadow-2xl"
      style={{ height }}
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-light tracking-[0.2em] text-[10px] uppercase">Monitor de Telemetría Emocional</h3>
          <p className="text-zinc-500 text-[9px]">Sincronización activa con Isabella AI</p>
        </div>
        <div className="flex gap-3">
          {PATTERNS.map((p) => (
            <div key={p} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.3)]" style={{ backgroundColor: getPatternColor(p) }} />
              <span className="text-[7px] text-zinc-500 font-bold uppercase tracking-tighter">{p}</span>
            </div>
          ))}
        </div>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" hide />
          <YAxis domain={[0, 100]} hide />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as ChartPoint;
                return (
                  <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-2xl">
                    <p className="text-[9px] text-white font-black border-b border-white/10 pb-1 mb-1 italic">{item.module}</p>
                    <p className="text-[8px] text-zinc-400">ESTADO: <span style={{ color: getPatternColor(item.pattern) }}>{item.pattern}</span></p>
                    <p className="text-[8px] text-zinc-400">CARGA: {item.intensity.toFixed(0)}%</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="intensity"
            stroke={strokeColor}
            strokeWidth={2}
            fill="url(#colorIntensity)"
            isAnimationActive={true}
            animationDuration={1000}
          />
          <ReferenceLine y={80} stroke="#f97373" strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
