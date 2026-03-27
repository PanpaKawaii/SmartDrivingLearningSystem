export const normalizeDetailResponse = (response) => {
    if (!response) return null;
    if (Array.isArray(response)) return response[0] || null;
    if (response?.data) return response.data;
    if (response?.item) return response.item;
    if (response?.result) return response.result;
    return response;
};