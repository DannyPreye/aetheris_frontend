/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentSettings } from './AgentSettings';
export type CreateOrganizationInput = {
    name: string;
    ownerId: string;
    description?: string;
    industry?: string;
    website?: string;
    whatsappPhoneId?: string;
    whatsappToken?: string;
    whatsappBusinessId?: string;
    isActive?: boolean;
    settings?: Record<string, any>;
    agentSettings?: AgentSettings;
};

