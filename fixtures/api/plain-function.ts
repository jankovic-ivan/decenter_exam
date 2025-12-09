import type { APIRequestContext, APIResponse } from '@playwright/test';

/**
 * Simplified helper for making API requests and returning the status and JSON body.
 * @param {Object} params - The parameters for the request.
 * @param {APIRequestContext} params.request - The Playwright request object, used to make the HTTP request.
 * @param {string} params.method - The HTTP method to use (POST, GET, PUT, DELETE).
 * @param {string} params.url - The URL to send the request to.
 * @param {string} [params.baseUrl] - The base URL to prepend to the request URL.
 * @param {Record<string, unknown> | string | URLSearchParams | null} [params.body=null] - The body to send with the request (for POST and PUT requests).
 * @param {string | Record<string, string> | undefined} [params.headers=undefined] - The headers to include with the request.
 * @returns {Promise<{ status: number; body: unknown }>} - An object containing the status code and the parsed response body.
 *    - `status`: The HTTP status code returned by the server.
 *    - `body`: The parsed JSON response body from the server.
 */
export async function apiRequest({
    request,
    method,
    url,
    baseUrl,
    body = null,
    headers,
}: {
    request: APIRequestContext;
    method: 'POST' | 'GET' | 'PUT' | 'DELETE';
    url: string;
    baseUrl?: string;
    body?: Record<string, unknown> | string | URLSearchParams | null;
    headers?: string | Record<string, string>;
}): Promise<{ status: number; body: unknown }> {
    let response: APIResponse;

    const options: {
        data?: Record<string, unknown> | string | null;
        form?: Record<string, string | number | boolean>;
        headers?: Record<string, string>;
    } = {};

    // Handle different body types
    if (body) {
        if (body instanceof URLSearchParams) {
            // Convert URLSearchParams to form data
            options.form = Object.fromEntries(body.entries());
        } else if (typeof body === 'string') {
            options.data = body;
        } else {
            options.data = body;
        }
    }

    // Handle headers - check if it's a token string or custom headers object
    if (typeof headers === 'string') {
        // Token-based authentication
        options.headers = {
            Authorization: `Token ${headers}`,
            'Content-Type': 'application/json',
        };
    } else if (headers && typeof headers === 'object') {
        // Custom headers object
        options.headers = headers;
    } else {
        // Default headers
        options.headers = {
            'Content-Type': 'application/json',
        };
    }

    const fullUrl = baseUrl ? `${baseUrl}${url}` : url;

    switch (method.toUpperCase()) {
        case 'POST':
            response = await request.post(fullUrl, options);
            break;
        case 'GET':
            response = await request.get(fullUrl, options);
            break;
        case 'PUT':
            response = await request.put(fullUrl, options);
            break;
        case 'DELETE':
            response = await request.delete(fullUrl, options);
            break;
        default:
            throw new Error(`Unsupported HTTP method: ${method}`);
    }

    const status = response.status();

    let bodyData: unknown = null;
    const contentType = response.headers()['content-type'] || '';

    try {
        if (contentType.includes('application/json')) {
            bodyData = await response.json();
        } else if (contentType.includes('text/')) {
            bodyData = await response.text();
        }
    } catch (err) {
        console.warn(
            `Failed to parse response body for status ${status}: ${err}`
        );
    }

    return { status, body: bodyData };
}