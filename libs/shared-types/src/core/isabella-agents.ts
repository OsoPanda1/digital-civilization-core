export type AgentRole = "planner" | "context" | "xr" | "economy" | "identity" | "security" | "sre";

export interface CreatorSignature {
  creatorPubKey: string; // Formato Ed25519: tamv-edwin-...
  creatorDid: string;    // did:tamv:edwin-oswaldo-castillo-trejo
  version: string;
}

export interface IsabellaAgent {
  id: string;
  role: AgentRole;
  capabilities: string[];
  permissions: string[];
  creatorSignature?: CreatorSignature;
}

export type TaskRiskLevel = "low" | "medium" | "high" | "critical";

export interface AgentTask {
  taskId: string;
  assignedTo: AgentRole;
  input: unknown;
  status: "pending" | "executing" | "completed" | "failed" | "blocked";
  result?: unknown;
  riskLevel: TaskRiskLevel;
  verifiedByCreator: boolean;
  audit: {
    createdAt: string;
    createdByAgentId: string;
    creatorDid?: string;
  };
}
