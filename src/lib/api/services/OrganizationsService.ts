/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentSettings } from '../models/AgentSettings';
import type { CreateOrganizationInput } from '../models/CreateOrganizationInput';
import type { Organization } from '../models/Organization';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService {
    /**
     * List organizations
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Organizations(): CancelablePromise<{
        data?: Array<Organization>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations',
        });
    }
    /**
     * Create organization
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Organizations(
        requestBody: CreateOrganizationInput,
    ): CancelablePromise<{
        data?: Organization;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/organizations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get organization
     * @param id
     * @returns any Org
     * @throws ApiError
     */
    public static getApiV1Organizations1(
        id: string,
    ): CancelablePromise<{
        data?: Organization;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Update organization
     * @param id
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static putApiV1Organizations(
        id: string,
        requestBody: CreateOrganizationInput,
    ): CancelablePromise<{
        data?: Organization;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/organizations/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Delete organization
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Organizations(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/organizations/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Get organization agent settings
     * @param id
     * @returns any Agent settings
     * @throws ApiError
     */
    public static getApiV1OrganizationsAgentSettings(
        id: string,
    ): CancelablePromise<{
        data?: AgentSettings;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}/agent-settings',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Update organization agent settings
     * @param id
     * @param requestBody
     * @returns any Agent settings updated
     * @throws ApiError
     */
    public static putApiV1OrganizationsAgentSettings(
        id: string,
        requestBody: AgentSettings,
    ): CancelablePromise<{
        data?: AgentSettings;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/organizations/{id}/agent-settings',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Get organization settings
     * @param id
     * @returns any Settings
     * @throws ApiError
     */
    public static getApiV1OrganizationsSettings(
        id: string,
    ): CancelablePromise<{
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}/settings',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Update organization settings
     * @param id
     * @param requestBody
     * @returns any Settings updated
     * @throws ApiError
     */
    public static putApiV1OrganizationsSettings(
        id: string,
        requestBody: Record<string, any>,
    ): CancelablePromise<{
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/organizations/{id}/settings',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Initiate Meta/WhatsApp OAuth flow for organization
     * @param id
     * @returns any OAuth URL to redirect the user
     * @throws ApiError
     */
    public static getApiV1OrganizationsConnectWhatsapp(
        id: string,
    ): CancelablePromise<{
        data?: {
            url?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}/connect-whatsapp',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Callback endpoint for Meta OAuth (exchanges code for token and stores IDs)
     * @param code
     * @param state
     * @returns any Success
     * @throws ApiError
     */
    public static getApiV1OrganizationsOauthMetaCallback(
        code: string,
        state: string,
    ): CancelablePromise<{
        data?: {
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/oauth/meta/callback',
            query: {
                'code': code,
                'state': state,
            },
            errors: {
                400: `Invalid request or state`,
                500: `Server error`,
            },
        });
    }
}
