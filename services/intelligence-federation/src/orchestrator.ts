import { IsabellaAgent, AgentTask } from "@tamv/shared-types";
import { CreatorIdentity, CreatorSessionContext } from "@tamv/shared-types";

export interface SecurityDecision { allow: boolean; reason: string; }

export class IsabellaOrchestrator {
  constructor(
    private readonly agentProfile: IsabellaAgent,
    private readonly sentinel: { evaluateTask(t: AgentTask): Promise<SecurityDecision> },
    private readonly creatorSession?: CreatorSessionContext
  ) {
    this.logRecognition();
  }

  private logRecognition() {
    if (CreatorIdentity.isCreatorAgent(this.agentProfile)) {
      console.info(`[SYSTEM]: Creador Detectado - DID: ${CreatorIdentity.CREATOR_DID}`);
    }
  }

  async executeTask(taskInput: unknown): Promise<AgentTask> {
    const task = CreatorIdentity.signTask(
      { assignedTo: this.agentProfile.role, input: taskInput },
      this.agentProfile,
      this.creatorSession
    );

    const decision = await this.sentinel.evaluateTask(task);
    
    if (!decision.allow) {
      console.warn(`[BLOCKED]: ${decision.reason}`);
      return { ...task, status: "blocked", result: { error: decision.reason } };
    }

    // Ejecución de la lógica de agentes aquí...
    return { ...task, status: "completed", result: { success: true } };
  }
}
