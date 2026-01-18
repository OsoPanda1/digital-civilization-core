// libs/shared-types/src/core/tamvcrums.ts

export type EcgPattern = "stable" | "focused" | "overloaded" | "scattered";

export interface TAMVCrum {
  id: string;
  timestamp: Date;
  module: "dreamspace" | "bank" | "governance" | "art-gallery" | "intelligence";
  action: "create" | "collab" | "transaction" | "view" | "report";
  impact: {
    credits: number;
    socialIndex: number; // Impacto en la red
    milestoneReached?: string;
  };
  ecgContext: {
    pattern: EcgPattern;
    intensity: number; // 0-1 (Carga mental detectada)
    sessionDuration: number;
  };
  metadata: Record<string, any>;
}
