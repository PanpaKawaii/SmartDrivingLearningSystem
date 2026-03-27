const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

console.log(apiUrl);

// Hàm gọi API GET
export const fetchData = async (endpoint, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Hàm gọi API POST
export const postData = async (endpoint, data, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};

// Hàm gọi API PUT
export const putData = async (endpoint, data, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error putting data:', error);
        throw error;
    }
};

// Hàm gọi API PATCH
export const patchData = async (endpoint, data, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return;
    } catch (error) {
        console.error('Error patching data:', error);
        throw error;
    }
};

// Hàm gọi API DELETE
export const deleteData = async (endpoint, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
};

const normalizeMediaUploadResponse = (payload) => {
    if (Array.isArray(payload)) {
        return payload;
    }

    if (Array.isArray(payload?.items)) {
        return payload.items;
    }

    if (Array.isArray(payload?.data)) {
        return payload.data;
    }

    if (payload && typeof payload === 'object') {
        return [payload];
    }

    return [];
};

export const uploadMedia = async ({ files = [], entityId = '', imageTarget = '', token = '' }) => {
    try {
        if (!Array.isArray(files) || files.length === 0) {
            throw new Error('Files is required');
        }

        if (!entityId) {
            throw new Error('EntityId is required');
        }

        if (!imageTarget) {
            throw new Error('ImageTarget is required');
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('Files', file);
        });
        formData.append('EntityId', entityId);
        formData.append('ImageTarget', imageTarget);

        const response = await fetch(`${apiUrl}api/media/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const payload = await response.json();
        return normalizeMediaUploadResponse(payload);
    } catch (error) {
        console.error('Error uploading media:', error);
        throw error;
    }
};

export const deleteMedia = async ({ fileUrl = '', imageTarget = '', token = '' }) => {
    try {
        if (!fileUrl) {
            throw new Error('fileUrl is required');
        }

        if (!imageTarget) {
            throw new Error('imageTarget is required');
        }

        const query = new URLSearchParams({
            fileUrl,
            imageTarget,
        });

        const response = await fetch(`${apiUrl}api/media?${query.toString()}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        if (response.status === 204) {
            return true;
        }

        const text = await response.text();
        return text ? JSON.parse(text) : true;
    } catch (error) {
        console.error('Error deleting media:', error);
        throw error;
    }
};
