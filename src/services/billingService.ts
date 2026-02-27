import { endpoints, defaultHeaders } from './api';

export interface SubscriptionInfo {
    plan: string;
    status: string;
}

export interface CheckoutResponse {
    checkout_url: string;
}

export const billingService = {
    /**
     * Fetch current billing information (subscription status and plan)
     */
    async getBillingInfo(token: string): Promise<SubscriptionInfo> {
        const response = await fetch(endpoints.billing, {
            method: 'GET',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                // If no subscription is found, return free plan gracefully if backend doesn't handle it
                return { plan: 'free', status: 'active' };
            }
            throw new Error('Failed to fetch billing information');
        }

        return response.json();
    },

    /**
     * Create a Stripe Checkout session for a subscription plan
     */
    async createSubscriptionCheckout(plan: string, token: string): Promise<CheckoutResponse> {
        const response = await fetch(endpoints.billingCheckoutSubscription, {
            method: 'POST',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ plan }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Failed to create subscription checkout session');
        }

        return response.json();
    },

    /**
     * Create a Stripe Checkout session for a one-time dataset purchase
     */
    async createDatasetCheckout(datasetId: string, token: string): Promise<CheckoutResponse> {
        const response = await fetch(endpoints.billingCheckoutDataset, {
            method: 'POST',
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ dataset_id: datasetId }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || 'Failed to create dataset checkout session');
        }

        return response.json();
    }
};
