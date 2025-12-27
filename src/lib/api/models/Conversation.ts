/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Conversation = {
    id: string;
    organizationId: string;
    customerId: string;
    status: Conversation.status;
    assignedToId?: string;
    priority: Conversation.priority;
    startedAt: string;
    endedAt?: string;
    lastMessageAt: string;
    metadata?: Record<string, any>;
};
export namespace Conversation {
    export enum status {
        ACTIVE = 'ACTIVE',
        WAITING_FOR_AGENT = 'WAITING_FOR_AGENT',
        WITH_AGENT = 'WITH_AGENT',
        RESOLVED = 'RESOLVED',
        ARCHIVED = 'ARCHIVED',
    }
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        URGENT = 'URGENT',
    }
}

