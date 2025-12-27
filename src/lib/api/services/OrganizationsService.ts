/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AgentSettings } from '../models/AgentSettings';
import type { CreateOrganizationInput } from '../models/CreateOrganizationInput';
import type { Organization } from '../models/Organization';
import type { UpdateOrganizationInput } from '../models/UpdateOrganizationInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrganizationsService
{
    /**
     * List organizations
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Organizations(): CancelablePromise<{
        data?: Array<Organization>;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations',
        });
    }
    /**
     * Create organization
     * Create a new organization during user registration. WhatsApp fields (whatsappPhoneId, whatsappToken, whatsappBusinessId), website, and agent settings will be added later via dedicated endpoints.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Organizations(
        requestBody: CreateOrganizationInput,
    ): CancelablePromise<{
        data?: Organization;
    }>
    {
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
    }>
    {
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
        requestBody: UpdateOrganizationInput,
    ): CancelablePromise<{
        data?: Organization;
    }>
    {
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
    ): CancelablePromise<void>
    {
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
    }>
    {
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
    }>
    {
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
    }>
    {
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
    }>
    {
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
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}/connect-whatsapp',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Initialize WhatsApp OAuth flow (Step 1)
     * @param id
     * @returns any OAuth authorization URL
     * @throws ApiError
     */
    public static getApiV1OrganizationsWhatsappInitOauth(
        id: string,
    ): CancelablePromise<{
        /**
         * URL to redirect user for authorization
         */
        authUrl?: string;
        message?: string;
    }>
    {
        console.log('OPENAPI_______', OpenAPI);
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/{id}/whatsapp/init-oauth',
            path: {
                'id': id,
            },
        });
    }
    /**
     * OAuth callback handler (Step 2)
     * Handles the callback from Meta OAuth. Returns state token for selecting WABA and phone number.
     * @param code
     * @param state
     * @returns any Token exchange successful
     * @throws ApiError
     */
    public static getApiV1OrganizationsWhatsappCallback(
        code: string,
        state: string,
    ): CancelablePromise<{
        success?: boolean;
        /**
         * State token for next steps
         */
        state?: string;
        message?: string;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/whatsapp/callback',
            query: {
                'code': code,
                'state': state,
            },
        });
    }
    /**
     * Get available WhatsApp Business Accounts (Step 3)
     * @param state
     * @returns any List of available accounts
     * @throws ApiError
     */
    public static getApiV1OrganizationsWhatsappAccounts(
        state: string,
    ): CancelablePromise<{
        wabaOptions?: Array<{
            id?: string;
            name?: string;
            timezone_id?: string;
        }>;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/whatsapp/accounts',
            query: {
                'state': state,
            },
        });
    }
    /**
     * Get phone numbers for selected account (Step 4)
     * @param state
     * @param wabaId
     * @returns any List of available phone numbers
     * @throws ApiError
     */
    public static getApiV1OrganizationsWhatsappPhoneNumbers(
        state: string,
        wabaId: string,
    ): CancelablePromise<{
        phoneOptions?: Array<{
            id?: string;
            displayPhoneNumber?: string;
            verifiedName?: string;
            qualityRating?: string;
        }>;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/organizations/whatsapp/phone-numbers',
            query: {
                'state': state,
                'wabaId': wabaId,
            },
        });
    }
    /**
     * Save WhatsApp configuration (Step 5)
     * Automatically populates whatsappPhoneId, whatsappBusinessId, and whatsappToken fields on the organization.
     * @param id
     * @param requestBody
     * @returns any Configuration saved with auto-populated WhatsApp fields
     * @throws ApiError
     */
    public static postApiV1OrganizationsWhatsappSaveConfig(
        id: string,
        requestBody: {
            /**
             * OAuth state token from callback
             */
            state: string;
            /**
             * Selected WhatsApp Business Account ID
             */
            wabaId: string;
            /**
             * Selected phone number ID
             */
            phoneNumberId: string;
        },
    ): CancelablePromise<{
        success?: boolean;
        data?: Organization;
        message?: string;
    }>
    {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/organizations/{id}/whatsapp/save-config',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
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
    }>
    {
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
