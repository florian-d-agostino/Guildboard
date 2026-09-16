import type { ApiError } from "../types/api";


// API URL
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// API ERROR GESTION 
export class ApiException extends Error {
    readonly status: number;
    readonly code: string;

    constructor(error: ApiError) {
        super(error.message);
        this.name = "ApiException";
        this.status = error.status;
        this.code = error.code;
    }
}

// Request options with query params and generic body 
interface RequestOptions extends Omit<RequestInit, 'body'> {
    params?: Record<string, string | number | undefined>;
    body?: unknown;
}

// Core fetch wrapper
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    let url = `${BASE_URL}${endpoint}`;

    const headers = new Headers(options.headers);
    if (options.params) {
        const searchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(options.params)) {
            if (value !== undefined && value !== "") {
                searchParams.append(key, String(value));
            }
        }

        const queryString = searchParams.toString();
        if (queryString) {
            url += `?${queryString}`;
        }
    }

    let body: BodyInit | undefined = undefined;
    if (options.body !== undefined) {
        body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
    }

    if (body && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, {
        ...options,
        headers,
        body,
    });

    if (!response.ok) {
        let errorPayload: ApiError;
        try {
            errorPayload = (await response.json()) as ApiError;
        } catch {
            errorPayload = {
                status: response.status,
                code: "HTTP_ERROR",
                message: response.statusText || "An unexpected error occured",
            };
        }
        throw new ApiException(errorPayload);
    }

    if (response.status === 204) {
        return undefined as unknown as T;
    }

    return response.json() as Promise<T>;
}

// Public methods
export const apiClient = {
    get<T>(endpoint: string, options?: Omit<RequestOptions, "body">): Promise<T> {
        return request<T>(endpoint, { ...options, method: "GET" });
    },

    post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return request<T>(endpoint, { ...options, method: "POST", body });
    },

    patch<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
        return request<T>(endpoint, { ...options, method: "PATCH", body });
    },

    delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
        return request<T>(endpoint, { ...options, method: "DELETE" });
    },
};