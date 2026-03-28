export const normalizeDetailResponse = (response) => {
    if (!response) return null;
    if (Array.isArray(response)) return response[0] || null;
    if (response?.data) return response.data;
    if (response?.item) return response.item;
    if (response?.result) return response.result;
    return response;
};

export const normalizeListResponse = (response) => {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.items)) return response.items;
    if (Array.isArray(response?.data)) return response.data;
    if (Array.isArray(response?.result)) return response.result;
    return [];
};