/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateIntegrationInput = {
    /**
     * Organization ID
     */
    organizationId: string;
    /**
     * Type of integration
     */
    type: CreateIntegrationInput.type;
    /**
     * Display name for this integration
     */
    name: string;
    /**
     * Integration-specific config. For calendly: {apiKey, calendarUrl}. For stripe: {apiKey, publishableKey}. For slack: {botToken, channelId}.
     */
    config: Record<string, any>;
    /**
     * Whether this integration is active
     */
    isActive?: boolean;
};
export namespace CreateIntegrationInput {
    /**
     * Type of integration
     */
    export enum type {
        CALENDLY = 'calendly',
        STRIPE = 'stripe',
        SLACK = 'slack',
        CRM = 'crm',
        EMAIL = 'email',
        WEBHOOK = 'webhook',
        ZAPIER = 'zapier',
        CUSTOM = 'custom',
    }
}

