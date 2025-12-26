/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthLoginInput } from '../models/AuthLoginInput';
import type { AuthRegisterInput } from '../models/AuthRegisterInput';
import type { ForgotPasswordInput } from '../models/ForgotPasswordInput';
import type { RefreshInput } from '../models/RefreshInput';
import type { ResetPasswordInput } from '../models/ResetPasswordInput';
import type { Tokens } from '../models/Tokens';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Register user
     * @param requestBody
     * @returns any User registered
     * @throws ApiError
     */
    public static postApiV1AuthRegister(
        requestBody: AuthRegisterInput,
    ): CancelablePromise<{
        data?: {
            user?: User;
            tokens?: Tokens;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Login
     * @param requestBody
     * @returns any Logged in
     * @throws ApiError
     */
    public static postApiV1AuthLogin(
        requestBody: AuthLoginInput,
    ): CancelablePromise<{
        data?: {
            user?: User;
            tokens?: Tokens;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Refresh tokens
     * @param requestBody
     * @returns any New tokens
     * @throws ApiError
     */
    public static postApiV1AuthRefresh(
        requestBody: RefreshInput,
    ): CancelablePromise<{
        data?: Tokens;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Logout
     * @param requestBody
     * @returns any Logged out
     * @throws ApiError
     */
    public static postApiV1AuthLogout(
        requestBody: RefreshInput,
    ): CancelablePromise<{
        data?: {
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/logout',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Request password reset
     * @param requestBody
     * @returns any Reset token (testing)
     * @throws ApiError
     */
    public static postApiV1AuthForgotPassword(
        requestBody: ForgotPasswordInput,
    ): CancelablePromise<{
        data?: {
            resetToken?: string;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset password
     * @param requestBody
     * @returns any Password reset
     * @throws ApiError
     */
    public static postApiV1AuthResetPassword(
        requestBody: ResetPasswordInput,
    ): CancelablePromise<{
        data?: {
            success?: boolean;
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
