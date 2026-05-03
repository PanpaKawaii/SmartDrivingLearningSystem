const ROBOFLOW_WORKFLOW_URL = 'https://serverless.roboflow.com/sub-wtikx/workflows/text-recognition';
const RETRYABLE_STATUSES = new Set([502, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const parseResponseBody = async (response) => {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return { message: text };
    }
};

const postToRoboflow = async (payload) => {
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
        const response = await fetch(ROBOFLOW_WORKFLOW_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await parseResponseBody(response);

        if (!response.ok) {
            console.error('[Roboflow] upstream error', {
                attempt,
                status: response.status,
                data,
            });
        }

        if (response.ok) {
            return { response, data };
        }

        if (attempt < maxAttempts && RETRYABLE_STATUSES.has(response.status)) {
            await sleep(250 * attempt);
            continue;
        }

        return { response, data };
    }

    throw new Error('Failed to contact Roboflow workflow');
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('[roboflow] handler received request', { body: req.body });
        const { response, data } = await postToRoboflow(req.body);

        if (!response.ok) {
            console.error('[roboflow] upstream returned non-ok', {
                status: response.status,
                upstreamResponse: data,
            });
            return res.status(response.status).json({
                error: 'Roboflow workflow request failed',
                upstreamStatus: response.status,
                upstreamResponse: data,
            });
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('[roboflow] handler error', error);
        return res.status(500).json({ error: error.message });
    }
}