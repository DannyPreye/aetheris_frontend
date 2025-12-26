/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Document = {
    id: string;
    organizationId: string;
    name: string;
    originalName: string;
    type: Document.type;
    fileUrl: string;
    fileSize: number;
    mimeType: string;
    status?: Document.status;
    uploadedBy: string;
    processedAt?: string;
};
export namespace Document {
    export enum type {
        PDF = 'PDF',
        IMAGE = 'IMAGE',
        TEXT = 'TEXT',
        DOCX = 'DOCX',
        EXCEL = 'EXCEL',
        CSV = 'CSV',
    }
    export enum status {
        PENDING = 'PENDING',
        PROCESSING = 'PROCESSING',
        COMPLETED = 'COMPLETED',
        FAILED = 'FAILED',
    }
}

