/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserRole } from './UserRole';
export type CreateUserInput = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role?: UserRole;
    isActive?: boolean;
};

