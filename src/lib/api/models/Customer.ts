/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Customer = {
    id: string;
    organizationId: string;
    whatsappNumber: string;
    name?: string;
    email?: string;
    language?: string;
    metadata?: Record<string, any>;
    tags?: Array<string>;
    isBlocked?: boolean;
    /**
     * True once the customer has at least one conversation
     */
    hasStartedConversation?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

