/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Conversation } from '../models/Conversation';
import type { CreateCustomerInput } from '../models/CreateCustomerInput';
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * List customers
     * Returns customers the authenticated user can access. Members and owners see customers for their organizations. Optional filter by organization.
     * @param organizationId Filter by organization ID (must be in user organizations)
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Customers(
        organizationId?: string,
    ): CancelablePromise<{
        data?: Array<Customer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers',
            query: {
                'organizationId': organizationId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Create customer
     * Owner-only: Only the organization owner can create customers for that organization.
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Customers(
        requestBody: CreateCustomerInput,
    ): CancelablePromise<{
        data?: Customer;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/customers',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * Get customer
     * Members and owners can fetch customers in their organizations.
     * @param id
     * @returns any Customer
     * @throws ApiError
     */
    public static getApiV1Customers1(
        id: string,
    ): CancelablePromise<{
        data?: Customer;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Update customer
     * Owner-only: Only the organization owner can update customers in their organization.
     * @param id
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static putApiV1Customers(
        id: string,
        requestBody: CreateCustomerInput,
    ): CancelablePromise<{
        data?: Customer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/customers/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Delete customer
     * Owner-only: Only the organization owner can delete customers in their organization.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Customers(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/customers/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * List customer conversations
     * Members and owners can view conversations for customers in their organizations.
     * @param id
     * @param page
     * @param limit
     * @param status
     * @param priority
     * @param assignedToId
     * @param startDate
     * @param endDate
     * @param sortBy
     * @param order
     * @returns any Paginated conversations
     * @throws ApiError
     */
    public static getApiV1CustomersConversations(
        id: string,
        page?: number,
        limit?: number,
        status?: string,
        priority?: string,
        assignedToId?: string,
        startDate?: string,
        endDate?: string,
        sortBy?: 'lastMessageAt' | 'startedAt' | 'endedAt',
        order?: 'asc' | 'desc',
    ): CancelablePromise<{
        data?: {
            items?: Array<Conversation>;
            page?: number;
            limit?: number;
            total?: number;
            pages?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{id}/conversations',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'status': status,
                'priority': priority,
                'assignedToId': assignedToId,
                'startDate': startDate,
                'endDate': endDate,
                'sortBy': sortBy,
                'order': order,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Block customer
     * Owner-only: Only the organization owner can block customers in their organization.
     * @param id
     * @returns any Blocked
     * @throws ApiError
     */
    public static putApiV1CustomersBlock(
        id: string,
    ): CancelablePromise<{
        data?: Customer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/customers/{id}/block',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
    /**
     * Unblock customer
     * Owner-only: Only the organization owner can unblock customers in their organization.
     * @param id
     * @returns any Unblocked
     * @throws ApiError
     */
    public static putApiV1CustomersUnblock(
        id: string,
    ): CancelablePromise<{
        data?: Customer;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/customers/{id}/unblock',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not found`,
            },
        });
    }
}
