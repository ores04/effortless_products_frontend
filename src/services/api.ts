export const API_BASE_URL_PROD = 'https://api.products.effort-less.de';

export const API_BASE_DEBUG_URL = 'https://euphoniously-heterodont-ellen.ngrok-free.app';

export const API_PREFIX = '/api';

export const API_VERSION = '/v1';

// check if VITE_DEBUG is true, then use API_BASE_DEBUG_URL, otherwise use API_BASE_URL

export const API_BASE_URL = import.meta.env.VITE_DEBUG ? API_BASE_DEBUG_URL : API_BASE_URL_PROD;

export const endpoints = {
    // auth do not have a version
    login: `${API_BASE_URL}${API_PREFIX}/auth/login`,
    register: `${API_BASE_URL}${API_PREFIX}/auth/register`,
    logout: `${API_BASE_URL}${API_PREFIX}/auth/logout`,

    // keys
    keys: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/keys`,

    // usage
    usageSummary: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/usage/summary`,
    usageKeys: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/usage/keys`,
    usageRecent: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/usage/recent`, // NOTE: this is not implemented yet

    // billing
    billing: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/billing`,
    billingCheckout: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/billing/checkout`,
    billingPortal: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/billing/portal`,

    // datasets
    datasets: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/datasets`,

    // stores
    stores: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/stores`,

    // products (v1)
    products: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/products`,
    datasetProducts: `${API_BASE_URL}${API_PREFIX}${API_VERSION}/datasets`, // + /:id/products
};

export const defaultHeaders = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
};
