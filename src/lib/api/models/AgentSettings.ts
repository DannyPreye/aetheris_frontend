/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentEscalationSettings } from './AgentEscalationSettings';
export type AgentSettings = {
    systemPrompt?: string;
    tone?: AgentSettings.tone;
    maxReplyLength?: number;
    signature?: string;
    callToAction?: string;
    followUpEnabled?: boolean;
    escalation?: AgentEscalationSettings;
};
export namespace AgentSettings {
    export enum tone {
        CONCISE = 'concise',
        FRIENDLY = 'friendly',
        FORMAL = 'formal',
        PLAYFUL = 'playful',
    }
}

