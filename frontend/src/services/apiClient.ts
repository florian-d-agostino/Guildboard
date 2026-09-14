import type { ApiError } from "../types/api";

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

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;

    const headers = new Headers(options.headers);
    if (!headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, { ...options, headers, });

    // If code error (4xx, 5xx)
    if (!response.ok) {
        let errorPayload: ApiError;
        try {
            errorPayload = (await response.json()) as ApiError;
        } catch {
            errorPayload = {
                status: response.status,
                code: "HTTP_ERROR",
                message: response.statusText || "Une erreur inattendue est survenue",

            };
        }
        throw new ApiException(errorPayload);
    }

    if (response.status === 204) {
        return undefined as unknown as T;
    }

    return response.json() as Promise<T>;
}