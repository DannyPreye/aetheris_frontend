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
     * @param organizationId Organization ID
     * @param formData
     * @returns any Uploaded
     * @throws ApiError
     */
    public static postApiV1OrganizationsDocumentsUpload(
        organizationId: string,
        formData: {
            /**
             * Document file to upload
             */
            file: Blob;
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
            url: '/api/v1/organizations/{organizationId}/documents/upload',
            path: {
                'organizationId': organizationId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * List documents for organization
     * @param organizationId Organization ID
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1OrganizationsDocuments(
        organizationId: string,
    ): CancelablePromise<{
        data?: Array<Document>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{organizationId}/documents',
            path: {
                'organizationId': organizationId,
            },
        });
    }
    /**
     * Get document
     * @param organizationId Organization ID
     * @param id Document ID
     * @returns any Doc
     * @throws ApiError
     */
    public static getApiV1OrganizationsDocuments1(
        organizationId: string,
        id: string,
    ): CancelablePromise<{
        data?: Document;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{organizationId}/documents/{id}',
            path: {
                'organizationId': organizationId,
                'id': id,
            },
        });
    }
    /**
     * Delete document
     * @param organizationId Organization ID
     * @param id Document ID
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1OrganizationsDocuments(
        organizationId: string,
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/organizations/{organizationId}/documents/{id}',
            path: {
                'organizationId': organizationId,
                'id': id,
            },
        });
    }
    /**
     * Reprocess document
     * @param organizationId Organization ID
     * @param id Document ID
     * @returns any Queued
     * @throws ApiError
     */
    public static postApiV1OrganizationsDocumentsReprocess(
        organizationId: string,
        id: string,
    ): CancelablePromise<{
        data?: Document;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/organizations/{organizationId}/documents/{id}/reprocess',
            path: {
                'organizationId': organizationId,
                'id': id,
            },
        });
    }
    /**
     * Processing status counts for organization
     * @param organizationId Organization ID
     * @returns any Status
     * @throws ApiError
     */
    public static getApiV1OrganizationsDocumentsStatus(
        organizationId: string,
    ): CancelablePromise<{
        data?: Record<string, number>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{organizationId}/documents/status',
            path: {
                'organizationId': organizationId,
            },
        });
    }
    /**
     * Bulk upload documents for organization
     * @param organizationId Organization ID
     * @param requestBody
     * @returns any Uploaded
     * @throws ApiError
     */
    public static postApiV1OrganizationsDocumentsBulkUpload(
        organizationId: string,
        requestBody: {
            items?: Array<UploadDocumentInput>;
        },
    ): CancelablePromise<{
        data?: Array<Document>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/organizations/{organizationId}/documents/bulk-upload',
            path: {
                'organizationId': organizationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
