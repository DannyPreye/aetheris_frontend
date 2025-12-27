/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateUserInput } from '../models/CreateUserInput';
import type { UpdateUserRoleInput } from '../models/UpdateUserRoleInput';
import type { User } from '../models/User';
import type { UserDependencies } from '../models/UserDependencies';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService
{
    /**
     * List users
     * @returns any List
     * @throws ApiError
     */
    public static getApiV1Users(): CancelablePromise<{
        data?: Array<User>;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users',
        });
    }
    /**
     * Create user
     * @param requestBody
     * @returns any Created
     * @throws ApiError
     */
    public static postApiV1Users(
        requestBody: CreateUserInput,
    ): CancelablePromise<{
        data?: User;
    }>
    {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get user
     * @param id
     * @returns any User
     * @throws ApiError
     */
    public static getApiV1Users1(
        id: string,
    ): CancelablePromise<{
        data?: User;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Update user
     * @param id
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static putApiV1Users(
        id: string,
        requestBody: CreateUserInput,
    ): CancelablePromise<{
        data?: User;
    }>
    {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/{id}',
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
     * Delete user
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiV1Users(
        id: string,
    ): CancelablePromise<void>
    {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Get user dependencies (organizations and roles)
     * @param id
     * @returns any User dependencies
     * @throws ApiError
     */
    public static getApiV1UsersDependencies(
        id: string,
    ): CancelablePromise<{
        data?: UserDependencies;
    }>
    {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/users/{id}/dependencies',
            path: {
                'id': id,
            },
            errors: {
                404: `Not found`,
            },
        });
    }
    /**
     * Update user role
     * @param id
     * @param requestBody
     * @returns any Updated
     * @throws ApiError
     */
    public static putApiV1UsersRole(
        id: string,
        requestBody: UpdateUserRoleInput,
    ): CancelablePromise<{
        data?: User;
    }>
    {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/users/{id}/role',
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
}
