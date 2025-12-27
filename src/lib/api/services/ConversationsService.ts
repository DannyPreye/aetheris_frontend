/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Message } from '../models/Message';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ConversationsService {
    /**
     * List messages for a conversation
     * Members and owners can view messages for conversations in their organizations. Supports pagination and search.
     * @param id
     * @param page
     * @param limit
     * @param q Search text in message content
     * @param direction
     * @param type
     * @param status
     * @param startDate
     * @param endDate
     * @param sortBy
     * @param order
     * @returns any Paginated messages
     * @throws ApiError
     */
    public static getApiV1ConversationsMessages(
        id: string,
        page?: number,
        limit?: number,
        q?: string,
        direction?: 'INBOUND' | 'OUTBOUND',
        type?: 'TEXT' | 'IMAGE' | 'DOCUMENT' | 'AUDIO' | 'VIDEO' | 'LOCATION' | 'TEMPLATE',
        status?: 'PENDING' | 'SENT' | 'DELIVERED' | 'READ' | 'FAILED',
        startDate?: string,
        endDate?: string,
        sortBy?: 'createdAt' | 'deliveredAt' | 'readAt',
        order?: 'asc' | 'desc',
    ): CancelablePromise<{
        data?: {
            items?: Array<Message>;
            page?: number;
            limit?: number;
            total?: number;
            pages?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/conversations/{id}/messages',
            path: {
                'id': id,
            },
            query: {
                'page': page,
                'limit': limit,
                'q': q,
                'direction': direction,
                'type': type,
                'status': status,
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
}
