import { endpoints, defaultHeaders } from './api';

export interface UserProfile {
    id: string;
    email: string;
    stripe_customer_id: string | null;
    status: string | null;
    created_at: string | null;
    updated_at: string | null;
}

export const authService = {
    /**
     * Fetch the currently authenticated user's profile
     */
    async getProfile(token: string): Promise<UserProfile> {
        const response = await fetch(endpoints.profile, {
            method: 'GET',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        return response.json();
    },
};
