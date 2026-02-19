import { endpoints, defaultHeaders } from './api';

export interface ApiKey {
    id: string;
    user_id: string;
    key_hash: string;
    key_prefix: string;
    name: string;
    is_active: boolean;
    last_used_at: string | null;
    expires_at: string | null;
    created_at: string;
}

export interface CreateKeyResponse {
    key: string; // The raw secret key, returned only once
    data: ApiKey;
}

export interface ListKeysResponse {
    keys: ApiKey[];
}

export const apiKeyService = {
    listKeys: async (token: string): Promise<ApiKey[]> => {
        const response = await fetch(endpoints.keys, {
            method: 'GET',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch API keys');
        const data: ListKeysResponse = await response.json();
        return data.keys || [];
    },

    createKey: async (token: string, name?: string): Promise<CreateKeyResponse> => {
        const response = await fetch(endpoints.keys, {
            method: 'POST',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) throw new Error('Failed to create API key');
        return response.json();
    },

    renameKey: async (token: string, id: string, name: string): Promise<void> => {
        const response = await fetch(`${endpoints.keys}/${id}`, {
            method: 'PATCH',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) throw new Error('Failed to rename API key');
    },

    revokeKey: async (token: string, id: string): Promise<void> => {
        const response = await fetch(`${endpoints.keys}/${id}`, {
            method: 'DELETE',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to revoke API key');
    },
};
