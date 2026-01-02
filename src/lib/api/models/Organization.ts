/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentSettings } from './AgentSettings';
export type Organization = {
    id: string;
    name: string;
    description?: string | null;
    industry?: string | null;
    website?: string | null;
    whatsappPhoneId?: string | null;
    whatsappToken?: string | null;
    whatsappBusinessId?: string | null;
    /**
     * Authentication method used: oauth or baileys
     */
    whatsappAuthType?: Organization.whatsappAuthType | null;
    /**
     * Current WhatsApp connection status
     */
    whatsappConnectionStatus?: Organization.whatsappConnectionStatus | null;
    isActive: boolean;
    ownerId: string;
    settings?: Record<string, any>;
    agentSettings?: AgentSettings;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Organization {
    /**
     * Authentication method used: oauth or baileys
     */
    export enum whatsappAuthType {
        OAUTH = 'oauth',
        BAILEYS = 'baileys',
    }
    /**
     * Current WhatsApp connection status
     */
    export enum whatsappConnectionStatus {
        CONNECTED = 'connected',
        DISCONNECTED = 'disconnected',
        PENDING = 'pending',
    }
}

