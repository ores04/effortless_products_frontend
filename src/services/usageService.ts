import { endpoints, defaultHeaders } from './api';

export interface UsageSummary {
    daily_requests: number; // Scalar now, not array
    error_rate: number;
    avg_response_time_ms: number;
}

export interface UsageRecord {
    api_key_id: string;
    user_id: string;
    endpoint: string;
    method: string;
    call_count: number;
    error_count: number;
    created_at: string | null;
}

export type UsageByKeyResponse = Record<string, UsageRecord[]>;



export const usageService = {
    getSummary: async (token: string): Promise<UsageSummary> => {
        const response = await fetch(endpoints.usageSummary, {
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch usage summary');
        return response.json();
    },

    getKeysUsage: async (token: string): Promise<UsageByKeyResponse> => {
        const response = await fetch(endpoints.usageKeys, {
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch usage by key');
        return response.json();
    },


};
