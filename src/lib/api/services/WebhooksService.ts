/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WebhooksService {
    /**
     * WhatsApp webhook verification
     * @returns any Challenge
     * @throws ApiError
     */
    public static getApiV1WebhookWhatsapp(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/webhook/whatsapp',
            errors: {
                403: `Forbidden`,
            },
        });
    }
    /**
     * WhatsApp webhook events
     * @returns any Received
     * @throws ApiError
     */
    public static postApiV1WebhookWhatsapp(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/webhook/whatsapp',
        });
    }
}
