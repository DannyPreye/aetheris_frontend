/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateIntegrationInput } from '../models/CreateIntegrationInput';
import type { Integration } from '../models/Integration';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class IntegrationsService {
    /**
     * List integrations
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Integrations(): CancelablePromise<{
        data?: Array<Integration>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/integrations',
        });
    }
    /**
     * Create integration
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Integrations(
        requestBody: CreateIntegrationInput,
    ): CancelablePromise<{
        data?: Integration;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/integrations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get integration
     * @param id
     * @returns any Integration
     * @throws ApiError
     */
    public static getApiV1Integrations1(
        id: string,
    ): CancelablePromise<{
        data?: Integration;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/integrations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update integration
     * @param id
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static putApiV1Integrations(
        id: string,
        requestBody: CreateIntegrationInput,
    ): CancelablePromise<{
        data?: Integration;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/integrations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete integration
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Integrations(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/integrations/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Test integration
     * @param id
     * @returns any Result
     * @throws ApiError
     */
    public static postApiV1IntegrationsTest(
        id: string,
    ): CancelablePromise<{
        data?: {
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/integrations/{id}/test',
            path: {
                'id': id,
            },
        });
    }
}
