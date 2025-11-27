import { POST } from '@/app/api/auth/logout/route';
import { NextRequest } from 'next/server';

describe('Logout API', () => {
  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const request = new NextRequest('http://localhost/api/auth/logout', {
        method: 'POST',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Logged out successfully');
      const tokenCookie = response.cookies.get('token');
      expect(tokenCookie?.value).toBe('');
    });
  });
});
