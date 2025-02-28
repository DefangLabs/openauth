import { getComputedOrigin } from './get-computed-origin';
import { Hono } from 'hono';

const testApp = new Hono();

testApp.get('/test', (c) => {
  const origin = getComputedOrigin(c);
  return c.json({ origin });
});

describe('getComputedOrigin', () => {
  it('should return the origin from the X-Forwarded headers', async () => {
    const res = await testApp.request('/test', {
      headers: {
        'X-Forwarded-Proto': 'https',
        'X-Forwarded-Host': 'example.com',
        'X-Forwarded-Port': '8000',
      }
    });
    const data = await res.json() as { origin: string };
    expect(data.origin).toEqual('https://example.com:8000');
  });

  it('should return the origin from the URL if no X-Forwarded headers are present', async () => {
    const res = await testApp.request('/test', {
      headers: {
        'Host': 'example.com',
      }
    });
    const data = await res.json() as { origin: string };
    expect(data.origin).toEqual('http://localhost');
  });
});
