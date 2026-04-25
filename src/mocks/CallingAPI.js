const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
const apiRoboflow = import.meta.env.VITE_REACT_ROBOFLOW_API;
if (import.meta.env.DEV) {
    console.log('API URL:', apiUrl);
    console.log('Roboflow API Key:', apiRoboflow);
}

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
            const error = new Error(response.statusText);
            error.status = response.status;
            error.data = await response.json().catch(() => null);
            throw error;
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
            const error = new Error(response.statusText);
            error.status = response.status;
            error.data = await response.json().catch(() => null);
            throw error;
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
            const error = new Error(response.statusText);
            error.status = response.status;
            error.data = await response.json().catch(() => null);
            throw error;
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
            const error = new Error(response.statusText);
            error.status = response.status;
            error.data = await response.json().catch(() => null);
            throw error;
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
            const error = new Error(response.statusText);
            error.status = response.status;
            error.data = await response.json().catch(() => null);
            throw error;
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

const extractUploadedVideoUrl = (payload) => {
    if (!payload) return '';

    if (typeof payload === 'string') {
        return payload;
    }

    if (typeof payload?.url === 'string') {
        return payload.url;
    }

    if (typeof payload?.videoUrl === 'string') {
        return payload.videoUrl;
    }

    if (typeof payload?.fileUrl === 'string') {
        return payload.fileUrl;
    }

    if (Array.isArray(payload)) {
        const first = payload[0];
        if (typeof first === 'string') return first;
        if (typeof first?.url === 'string') return first.url;
        if (typeof first?.videoUrl === 'string') return first.videoUrl;
        if (typeof first?.fileUrl === 'string') return first.fileUrl;
    }

    if (Array.isArray(payload?.data)) {
        return extractUploadedVideoUrl(payload.data);
    }

    if (Array.isArray(payload?.items)) {
        return extractUploadedVideoUrl(payload.items);
    }

    if (payload?.data && typeof payload.data === 'object') {
        return extractUploadedVideoUrl(payload.data);
    }

    return '';
};

export const uploadMedia = async (files, entityId, imageTarget, token) => {
    try {
        if (!Array.isArray(files) || files.length === 0) {
            console.log('files', files);
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

        const response = await fetch(`${apiUrl}media/upload`, {
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

export const uploadVideo = async (file, token) => {
    try {
        if (!file) {
            throw new Error('Video file is required');
        }

        const fieldCandidates = ['file', 'video', 'File', 'Files'];
        let lastError = null;

        for (const fieldName of fieldCandidates) {
            const formData = new FormData();
            formData.append(fieldName, file);

            const response = await fetch(`${apiUrl}media/video`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const error = new Error(response.statusText || 'Video upload failed');
                error.status = response.status;
                error.data = await response.json().catch(() => null);
                lastError = error;

                if (response.status === 400 || response.status === 415 || response.status === 422) {
                    continue;
                }

                throw error;
            }

            const payload = await response.json().catch(() => ({}));
            const uploadedUrl = extractUploadedVideoUrl(payload);

            if (!uploadedUrl) {
                throw new Error('Uploaded video URL not found in response');
            }

            return uploadedUrl;
        }

        throw lastError || new Error('Video upload failed');
    } catch (error) {
        console.error('Error uploading video:', error);
        throw error;
    }
};

export const deleteMedia = async (fileUrl, imageTarget, token) => {
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

        const response = await fetch(`${apiUrl}media?${query.toString()}`, {
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

export const fetchRoboflowData = async (imageUrl) => {
    const response = await fetch('/roboflow', {   // ← gọi vào serverless function
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            api_key: apiRoboflow,
            inputs: {
                "image": { "type": "url", "value": imageUrl }
            }
        })
    });

    if (!response.ok) {
        let errorDetail = `Status: ${response.status}`;
        try {
            const errorBody = await response.json();
            errorDetail += ` | ${JSON.stringify(errorBody)}`;
        } catch {
            const errorText = await response.text();
            errorDetail += ` | ${errorText}`;
        }
        throw new Error(`Roboflow API error: ${errorDetail}`);
    }

    return await response.json();
};


// xuất file từ API (ví dụ: báo cáo Excel)
export const fetchBlob = async (endpoint, token) => {
    try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                // Không để Content-Type là json ở đây vì ta đang nhận file
            },
        });

        if (!response.ok) {
            const error = new Error(response.statusText);
            error.status = response.status;
            throw error;
        }

        // QUAN TRỌNG: Trả về blob thay vì json
        return await response.blob();
    } catch (error) {
        console.error('Error fetching blob:', error);
        throw error;
    }
};

