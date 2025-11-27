import { POST } from '@/app/api/auth/logout/route';

describe('Logout API', () => {
  describe('POST /api/auth/logout', () => {
    it('should logout successfully', async () => {
      const response = await POST();
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Logged out successfully');
      const tokenCookie = response.cookies.get('token');
      expect(tokenCookie?.value).toBe('');
    });
  });
});
