/**
 * Application Constants
 * Centralized configuration values and magic numbers
 */

// Cache Time-To-Live (TTL) values in hours
export const CACHE_TTL = {
    TRENDS: 1,        // Trends cached for 1 hour
    CATEGORIES: 24,   // Categories cached for 24 hours
};

// Default pagination values
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_RESULTS: 50,
};

// Default sort field
export const DEFAULT_SORT_BY = 'views';

// Default region code
export const DEFAULT_REGION = 'US';

// Supported region codes
export const SUPPORTED_REGIONS = [
    'US', // United States
    'IN', // India
    'GB', // United Kingdom
    'JP', // Japan
    'CA', // Canada
    'AU', // Australia
    'DE', // Germany
    'FR', // France
];

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};
