import { endpoints, defaultHeaders } from './api';

export interface Dataset {
    id: string;
    store_id: string;
    owner_id: string;
    name: string;
    description: string | null;
    snapshot_date: string | null;
    source_url: string | null;
    import_method: string | null;
    status: string; // 'active' etc.
    product_count: number;
    error_message: string | null;
    created_at: string;
    updated_at: string;
}

export interface ListDatasetsResponse {
    datasets: Dataset[]; // The schema example shows [ { ... } ], so it might be an array directly or wrapped. 
    // The Schema example: "GET /api/v1/datasets ... Returns a list of datasets. [ {...}, ... ]"
    // It shows an array as the root. 
    // However, usually REST APIs wrap lists.
    // Let's check the schema again. 
    // "GET /api/v1/keys" returns { "keys": [...] }.
    // "GET /api/v1/datasets" returns [ ... ]. 
    // I will support both just in case, or stick to the schema reference which is an array.
    // The previous implementation used `data.datasets || []`.
    // I'll try to handle the array root.
}

export const datasetService = {
    getPublicDatasets: async (): Promise<Dataset[]> => {
        const response = await fetch(endpoints.datasets, {
            headers: defaultHeaders,
        });
        if (!response.ok) throw new Error('Failed to fetch public datasets');
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return (data as any).datasets || [];
    },

    listDatasets: async (token: string): Promise<Dataset[]> => {
        const response = await fetch(endpoints.datasets, {
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch datasets');
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return (data as any).datasets || [];
    },

    getUnlockedDatasets: async (token: string): Promise<Dataset[]> => {
        const response = await fetch(endpoints.datasetsUnlocked, {
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch unlocked datasets');
        return response.json();
    },

    getDataset: async (token: string, id: string): Promise<Dataset> => {
        const response = await fetch(`${endpoints.datasets}/${id}`, {
            headers: {
                ...defaultHeaders,
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Failed to fetch dataset details');
        return response.json();
    },
};
