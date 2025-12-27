/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateOrganizationInput = {
    /**
     * Organization name
     */
    name: string;
    /**
     * User ID of the organization owner
     */
    ownerId: string;
    /**
     * Optional organization description
     */
    description?: string;
    /**
     * Optional industry type
     */
    industry?: string;
    /**
     * Organization status
     */
    isActive?: boolean;
};

