import { getAllowedOrigins } from './get-allowed-origins';

describe('getAllowedOrigins', () => {
    it('should return the allowed origins from the environment variable', () => {
        process.env.ALLOWED_ORIGINS = 'http://example.com,http://another.com';
        const allowedOrigins = getAllowedOrigins();
        expect(allowedOrigins).toEqual(['http://example.com', 'http://another.com']);
    });

    it('should properly strip whitespace', () => {
        process.env.ALLOWED_ORIGINS = 'http://example.com , http://another.com ';
        const allowedOrigins = getAllowedOrigins();
        expect(allowedOrigins).toEqual(['http://example.com', 'http://another.com']);
    });

    it('should return undefined if the environment variable is not set', () => {
        delete process.env.ALLOWED_ORIGINS;
        const allowedOrigins = getAllowedOrigins();
        expect(allowedOrigins).toEqual([]);
    });

    it('should return an empty array if the environment variable is empty', () => {
        process.env.ALLOWED_ORIGINS = '';
        const allowedOrigins = getAllowedOrigins();
        expect(allowedOrigins).toEqual([]);
    });
});
