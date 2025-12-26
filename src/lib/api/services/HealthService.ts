/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class HealthService {
    /**
     * Liveness check
     * @returns any Service is alive
     * @throws ApiError
     */
    public static getApiV1HealthLive(): CancelablePromise<{
        data?: {
            status?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/live',
        });
    }
    /**
     * Readiness check
     * @returns any Readiness status
     * @throws ApiError
     */
    public static getApiV1HealthReady(): CancelablePromise<{
        data?: {
            status?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/health/ready',
        });
    }
}
