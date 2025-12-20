import axios, { AxiosError } from 'axios';

/**
 * Error Handler Utilities
 * Typed error parsing for consistent error handling
 */

export interface ParsedError {
    message: string;
    code: 'NETWORK' | 'RATE_LIMIT' | 'SERVER' | 'TIMEOUT' | 'UNKNOWN';
    statusCode?: number;
    retryable: boolean;
}

/**
 * Type guard for Axios errors
 */
export function isAxiosError(error: unknown): error is AxiosError {
    return axios.isAxiosError(error);
}

/**
 * Parse API errors into a consistent format
 * @param error - Unknown error from try/catch
 * @returns Parsed error with user-friendly message
 */
export function parseApiError(error: unknown): ParsedError {
    // Handle Axios errors
    if (isAxiosError(error)) {
        // Network error (no response)
        if (error.code === 'ERR_NETWORK') {
            return {
                message: '🌐 Network error. Check your connection and try again.',
                code: 'NETWORK',
                retryable: true,
            };
        }

        // Rate limiting
        if (error.response?.status === 429) {
            return {
                message: '⏰ Rate limit exceeded. Please wait before making more requests.',
                code: 'RATE_LIMIT',
                statusCode: 429,
                retryable: true,
            };
        }

        // Timeout
        if (error.code === 'ECONNABORTED') {
            return {
                message: '⏱️ Request timeout. Please try again.',
                code: 'TIMEOUT',
                retryable: true,
            };
        }

        // Server errors (500+)
        if (error.response && error.response.status >= 500) {
            const data = error.response.data as { message?: string } | undefined;
            return {
                message: data?.message || 'Server error occurred. Please try again later.',
                code: 'SERVER',
                statusCode: error.response.status,
                retryable: true,
            };
        }

        // Client errors (400-499)
        if (error.response) {
            const data = error.response.data as { message?: string } | undefined;
            return {
                message: data?.message || `Request failed with status ${error.response.status}`,
                code: 'SERVER',
                statusCode: error.response.status,
                retryable: false,
            };
        }
    }

    // Generic error
    if (error instanceof Error) {
        return {
            message: error.message,
            code: 'UNKNOWN',
            retryable: false,
        };
    }

    // Fallback
    return {
        message: 'An unknown error occurred.',
        code: 'UNKNOWN',
        retryable: false,
    };
}

/**
 * Format error message for display
 * @param error - Parsed error object
 * @returns User-friendly error message
 */
export function formatErrorMessage(error: ParsedError): string {
    return error.message;
}
