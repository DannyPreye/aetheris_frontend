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
     * List all integrations, optionally filtered by organizationId and/or type
     * @param organizationId Filter by organization ID
     * @param type Filter by integration type
     * @returns any List of integrations
     * @throws ApiError
     */
    public static getApiV1Integrations(
        organizationId?: string,
        type?: 'calendly' | 'stripe' | 'slack' | 'crm' | 'email' | 'webhook' | 'zapier' | 'custom',
    ): CancelablePromise<{
        data?: Array<Integration>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/integrations',
            query: {
                'organizationId': organizationId,
                'type': type,
            },
        });
    }
    /**
     * Create integration
     * Create a new integration. Required config fields vary by type.
     * @param requestBody
     * @returns any Integration created successfully
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
            errors: {
                400: `Bad request - missing required fields or invalid config`,
            },
        });
    }
    /**
     * Get integration by ID
     * Retrieve a specific integration by its ID
     * @param id Integration ID
     * @returns any Integration details
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
            errors: {
                404: `Integration not found`,
            },
        });
    }
    /**
     * Update integration
     * Update an existing integration. All fields are optional.
     * @param id Integration ID
     * @param requestBody
     * @returns any Integration updated successfully
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
            errors: {
                400: `Bad request - invalid config for type`,
                404: `Integration not found`,
            },
        });
    }
    /**
     * Delete integration
     * Delete an integration permanently
     * @param id Integration ID
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
            errors: {
                404: `Integration not found`,
            },
        });
    }
    /**
     * Test integration connection
     * Verify that the integration credentials are valid and the connection works. Updates the lastTestedAt and testStatus fields.
     * @param id Integration ID
     * @returns any Test result
     * @throws ApiError
     */
    public static postApiV1IntegrationsTest(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/integrations/{id}/test',
            path: {
                'id': id,
            },
            errors: {
                404: `Integration not found`,
            },
        });
    }
}
