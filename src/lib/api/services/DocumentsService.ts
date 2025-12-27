/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Document } from '../models/Document';
import type { UploadDocumentInput } from '../models/UploadDocumentInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DocumentsService {
    /**
     * Upload document (multipart to Cloudinary)
     * Document type is automatically determined from file MIME type. uploadedBy is automatically set to the authenticated user.
     * @param formData
     * @returns any Uploaded
     * @throws ApiError
     */
    public static postApiV1DocumentsUpload(
        formData: {
            /**
             * Document file to upload
             */
            file: Blob;
            /**
             * Organization ID
             */
            organizationId: string;
            /**
             * Optional document name, defaults to original filename
             */
            name?: string;
            /**
             * Optional document content
             */
            content?: string;
        },
    ): CancelablePromise<{
        data?: Document;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * List documents
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Documents(): CancelablePromise<{
        data?: Array<Document>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/documents',
        });
    }
    /**
     * Get document
     * @param id
     * @returns any Doc
     * @throws ApiError
     */
    public static getApiV1Documents1(
        id: string,
    ): CancelablePromise<{
        data?: Document;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/documents/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Delete document
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Documents(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/documents/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Reprocess document
     * @param id
     * @returns any Queued
     * @throws ApiError
     */
    public static postApiV1DocumentsReprocess(
        id: string,
    ): CancelablePromise<{
        data?: Document;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/{id}/reprocess',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Processing status counts
     * @returns any Status
     * @throws ApiError
     */
    public static getApiV1DocumentsStatus(): CancelablePromise<{
        data?: Record<string, number>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/documents/status',
        });
    }
    /**
     * Bulk upload documents
     * @param requestBody
     * @returns any Uploaded
     * @throws ApiError
     */
    public static postApiV1DocumentsBulkUpload(
        requestBody: {
            items?: Array<UploadDocumentInput>;
        },
    ): CancelablePromise<{
        data?: Array<Document>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/documents/bulk-upload',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
