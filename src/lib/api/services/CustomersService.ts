/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCustomerInput } from '../models/CreateCustomerInput';
import type { Customer } from '../models/Customer';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CustomersService {
    /**
     * List customers
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Customers(): CancelablePromise<{
        data?: Array<Customer>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers',
        });
    }
    /**
     * Create customer
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
        });
    }
    /**
     * Get customer
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
                404: `Not found`,
            },
        });
    }
    /**
     * Update customer
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
                404: `Not found`,
            },
        });
    }
    /**
     * Delete customer
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
                404: `Not found`,
            },
        });
    }
    /**
     * List customer conversations
     * @param id
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1CustomersConversations(
        id: string,
    ): CancelablePromise<{
        data?: Array<Record<string, any>>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/customers/{id}/conversations',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Block customer
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
        });
    }
    /**
     * Unblock customer
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
        });
    }
}
