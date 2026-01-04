/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentEscalationSettings } from './AgentEscalationSettings';
export type AgentSettings = {
    /**
     * Display name of the AI agent
     */
    agentName?: string;
    /**
     * Gender of the agent for personalization
     */
    agentGender?: AgentSettings.agentGender;
    /**
     * Age of the agent (for personality context)
     */
    agentAge?: number;
    /**
     * URL to agent avatar image
     */
    agentAvatar?: string;
    /**
     * Default language for agent responses (e.g., en, es, fr)
     */
    defaultLanguage?: string;
    /**
     * System prompt that defines agent behavior and personality
     */
    systemPrompt?: string;
    /**
     * Communication tone of the agent
     */
    tone?: AgentSettings.tone;
    /**
     * Maximum reply length in words
     */
    maxReplyLength?: number;
    /**
     * Agent signature for messages
     */
    signature?: string;
    /**
     * Default call to action for agent
     */
    callToAction?: string;
    /**
     * Whether follow-ups are enabled
     */
    followUpEnabled?: boolean;
    escalation?: AgentEscalationSettings;
};
export namespace AgentSettings {
    /**
     * Gender of the agent for personalization
     */
    export enum agentGender {
        MALE = 'male',
        FEMALE = 'female',
        NEUTRAL = 'neutral',
    }
    /**
     * Communication tone of the agent
     */
    export enum tone {
        CONCISE = 'concise',
        FRIENDLY = 'friendly',
        FORMAL = 'formal',
        PLAYFUL = 'playful',
    }
}

