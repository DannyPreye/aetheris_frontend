/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AnalyticsConversationPoint } from '../models/AnalyticsConversationPoint';
import type { AnalyticsCSATPoint } from '../models/AnalyticsCSATPoint';
import type { AnalyticsOverview } from '../models/AnalyticsOverview';
import type { AnalyticsPerformancePoint } from '../models/AnalyticsPerformancePoint';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnalyticsService {
    /**
     * Overview metrics
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns any Overview
     * @throws ApiError
     */
    public static getApiV1AnalyticsOverview(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data?: AnalyticsOverview;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/overview',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Conversations metrics
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns any Timeseries
     * @throws ApiError
     */
    public static getApiV1AnalyticsConversations(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data?: Array<AnalyticsConversationPoint>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/conversations',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Performance metrics
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns any Timeseries
     * @throws ApiError
     */
    public static getApiV1AnalyticsPerformance(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data?: Array<AnalyticsPerformancePoint>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/performance',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Customer satisfaction metrics
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns any Timeseries
     * @throws ApiError
     */
    public static getApiV1AnalyticsCustomerSatisfaction(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data?: Array<AnalyticsCSATPoint>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/customer-satisfaction',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Agent performance metrics
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns any Timeseries
     * @throws ApiError
     */
    public static getApiV1AnalyticsAgentPerformance(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<{
        data?: Array<AnalyticsPerformancePoint>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/agent-performance',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
    /**
     * Export CSV
     * @param organizationId
     * @param startDate
     * @param endDate
     * @returns string CSV export
     * @throws ApiError
     */
    public static getApiV1AnalyticsExport(
        organizationId: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/analytics/export',
            query: {
                'organizationId': organizationId,
                'startDate': startDate,
                'endDate': endDate,
            },
        });
    }
}
