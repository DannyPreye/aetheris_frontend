/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Message = {
    id: string;
    conversationId: string;
    whatsappId?: string;
    direction: Message.direction;
    type: Message.type;
    content: string;
    metadata?: Record<string, any>;
    status: Message.status;
    isFromAgent: boolean;
    aiGenerated: boolean;
    confidence?: number;
    createdAt: string;
    deliveredAt?: string;
    readAt?: string;
};
export namespace Message {
    export enum direction {
        INBOUND = 'INBOUND',
        OUTBOUND = 'OUTBOUND',
    }
    export enum type {
        TEXT = 'TEXT',
        IMAGE = 'IMAGE',
        DOCUMENT = 'DOCUMENT',
        AUDIO = 'AUDIO',
        VIDEO = 'VIDEO',
        LOCATION = 'LOCATION',
        TEMPLATE = 'TEMPLATE',
    }
    export enum status {
        PENDING = 'PENDING',
        SENT = 'SENT',
        DELIVERED = 'DELIVERED',
        READ = 'READ',
        FAILED = 'FAILED',
    }
}

