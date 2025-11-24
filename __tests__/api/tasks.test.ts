import { GET, POST } from '@/app/api/tasks/route';
import { DELETE } from '@/app/api/tasks/[id]/route';
import { NextRequest } from 'next/server';
import { initDatabase, closeDatabase } from '@/lib/db';
import { createUser, generateToken } from '@/lib/auth';

// Mock environment variables
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';

describe('Tasks API', () => {
  let authToken: string;
  let userId: number;

  beforeAll(async () => {
    await initDatabase();
    // Create a test user
    const user = await createUser('taskuser', 'taskuser@example.com', 'Test1234');
    userId = user.id;
    authToken = generateToken(user);
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('GET /api/tasks', () => {
    it('should return tasks for authenticated user', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        headers: {
          Cookie: `token=${authToken}`,
        },
      });

      const response = await GET(request);
      expect(response.status).toBe(200);
    });

    it('should reject unauthenticated requests', async () => {
      const request = new NextRequest('http://localhost/api/tasks');
      const response = await GET(request);
      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Task',
          description: 'This is a test task',
          status: 'pending',
          priority: 'high',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.title).toBe('Test Task');
      expect(data.status).toBe('pending');
      expect(data.priority).toBe('high');
    });

    it('should reject task without title', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          description: 'Task without title',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });
  });
});

