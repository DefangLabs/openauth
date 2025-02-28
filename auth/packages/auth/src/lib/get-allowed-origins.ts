

/**
 * Check the ALLOWED_ORIGINS environment variable and return an array of allowed origins.
 * 
 * @returns {string[] | undefined} An array of allowed origins, or undefined if the environment variable is not set or invalid.
 */
export function getAllowedOrigins() {
    const rawOrigins = process.env.ALLOWED_ORIGINS;
    const split = rawOrigins?.split(',');
    const trimmed = split?.map(o => o.trim());
    const filtered = trimmed?.filter(o => o);
    const valid = filtered?.filter(o => o.match(/^https?:\/\/[^/]+$/));
    return valid || [];
}