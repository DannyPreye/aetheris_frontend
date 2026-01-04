/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Integration = {
    id: string;
    organizationId: string;
    /**
     * Type of integration
     */
    type: Integration.type;
    name: string;
    /**
     * Integration-specific configuration. Required fields vary by type.
     */
    config: Record<string, any>;
    isActive: boolean;
    /**
     * Last time the integration was tested
     */
    lastTestedAt?: string | null;
    /**
     * Status of the last test
     */
    testStatus?: Integration.testStatus | null;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Integration {
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
    /**
     * Status of the last test
     */
    export enum testStatus {
        SUCCESS = 'success',
        FAILED = 'failed',
    }
}

