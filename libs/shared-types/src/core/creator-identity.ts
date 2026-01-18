import type { AgentTask, IsabellaAgent, TaskRiskLevel } from "./isabella-agents";

export interface CreatorSessionContext {
  did: string;
  deviceId: string;
  signature: string; // Firma sobre "nonce|timestamp|deviceId|action"
  assuranceLevel: "low" | "substantial" | "high"; // Biometría detectada
}

export class CreatorIdentity {
  static readonly CREATOR_PUBKEY = "ed25519:tamv-edwin-oswaldo-castillo-trejo-root-pubkey";
  static readonly CREATOR_DID = "did:tamv:edwin-oswaldo-castillo-trejo";

  static isCreatorAgent(agent: IsabellaAgent): boolean {
    if (!agent.creatorSignature) return false;
    return (
      agent.creatorSignature.creatorDid === this.CREATOR_DID &&
      agent.creatorSignature.creatorPubKey === this.CREATOR_PUBKEY
    );
  }

  static verifyCreatorSession(ctx: CreatorSessionContext): boolean {
    // Aquí se conectará con el servicio de ID NVIDA para validar la firma real
    return ctx.did === this.CREATOR_DID;
  }

  static classifyRisk(input: any): TaskRiskLevel {
    const action = input?.action;
    const criticalActions = ["withdraw_msr", "modify_governance", "purge_data"];
    if (criticalActions.includes(action)) return "critical";
    if (action?.includes("transfer") || action?.includes("global")) return "high";
    return "low";
  }

  static signTask(
    partial: Pick<AgentTask, "assignedTo" | "input">,
    agent: IsabellaAgent,
    creatorCtx?: CreatorSessionContext
  ): AgentTask {
    const riskLevel = this.classifyRisk(partial.input);
    const verifiedByCreator = !!creatorCtx && 
                             this.verifyCreatorSession(creatorCtx) && 
                             this.isCreatorAgent(agent);

    return {
      taskId: crypto.randomUUID(),
      assignedTo: partial.assignedTo,
      input: partial.input,
      status: "pending",
      riskLevel,
      verifiedByCreator,
      audit: {
        createdAt: new Date().toISOString(),
        createdByAgentId: agent.id,
        creatorDid: verifiedByCreator ? this.CREATOR_DID : undefined,
      },
    };
  }
}
