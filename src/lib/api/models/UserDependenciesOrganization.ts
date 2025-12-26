/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Organization } from './Organization';
import type { OrgUserRole } from './OrgUserRole';
export type UserDependenciesOrganization = {
    organization: Organization;
    role: OrgUserRole;
    relation: UserDependenciesOrganization.relation;
};
export namespace UserDependenciesOrganization {
    export enum relation {
        OWNER = 'OWNER',
        MEMBER = 'MEMBER',
    }
}

