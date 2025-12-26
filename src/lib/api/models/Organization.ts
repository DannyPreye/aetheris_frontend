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
    isActive: boolean;
    ownerId: string;
    settings?: Record<string, any>;
    agentSettings?: AgentSettings;
    createdAt?: string;
    updatedAt?: string;
};

