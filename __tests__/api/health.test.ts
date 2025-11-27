import { GET } from '@/app/api/health/route';

describe('Health API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data).toHaveProperty('status');
      expect(data).toHaveProperty('timestamp');
      expect(['healthy', 'unhealthy']).toContain(data.status);
    });

    it('should include database status', async () => {
      const response = await GET();
      const data = await response.json();

      expect(data).toHaveProperty('database');
      expect(['connected', 'disconnected', 'not_configured']).toContain(
        data.database
      );
    });
  });
});
