import { describe, it, expect, vi } from 'vitest';
import { getAccessToken, makeRequest, PressableError } from './api.js';
// Mock credentials
vi.mock('./config.js', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        getCredentials: vi.fn().mockReturnValue({
            clientId: 'test-client-id',
            clientSecret: 'test-client-secret'
        })
    };
});
describe('API Client', () => {
    it('getAccessToken should fetch a token', async () => {
        // Mock global fetch
        const originalFetch = global.fetch;
        global.fetch = vi.fn().mockResolvedValue(new Response(JSON.stringify({
            access_token: 'test-token'
        })));
        const token = await getAccessToken();
        expect(token).toBe('test-token');
        expect(global.fetch).toHaveBeenCalled();
        global.fetch = originalFetch;
    });
    it('makeRequest should throw PressableError on 401', async () => {
        const originalFetch = global.fetch;
        // Mock first call (getAccessToken) is successful, second call (makeRequest) is 401
        let callCount = 0;
        global.fetch = vi.fn().mockImplementation(() => {
            callCount++;
            if (callCount === 1) {
                return Promise.resolve(new Response(JSON.stringify({ access_token: 'test-token' })));
            }
            return Promise.resolve(new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }));
        });
        await expect(makeRequest('/test')).rejects.toThrow(PressableError);
        global.fetch = originalFetch;
    });
});
