import { GET, POST } from '@/app/api/tasks/route';
import { DELETE, PATCH } from '@/app/api/tasks/[id]/route';
import { NextRequest } from 'next/server';
import { initDatabase, closeDatabase } from '@/lib/db';
import { createUser, generateToken } from '@/lib/auth';

// Mock environment variables
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';

describe('Tasks API', () => {
  let authToken: string;
  let userId: number;

  beforeAll(async () => {
    await initDatabase();
    // Create a test user
    const user = await createUser(
      'taskuser',
      'taskuser@example.com',
      'Test1234'
    );
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

    it('should reject requests with invalid token', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        headers: {
          Cookie: 'token=invalid-token',
        },
      });
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

    it('should reject POST with invalid token', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Task',
          status: 'pending',
          priority: 'high',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'token=invalid-token',
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(401);
    });

    it('should reject POST with invalid status', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Task',
          status: 'invalid_status',
          priority: 'high',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await POST(request);
      expect(response.status).toBe(400);
    });

    it('should reject POST with invalid priority', async () => {
      const request = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Test Task',
          status: 'pending',
          priority: 'invalid_priority',
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

  describe('PATCH /api/tasks/[id]', () => {
    let taskId: number;

    beforeEach(async () => {
      // Create a task for testing
      const createRequest = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Task to Update',
          description: 'Original description',
          status: 'pending',
          priority: 'low',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });
      const createResponse = await POST(createRequest);
      const task = await createResponse.json();
      taskId = task.id;
    });

    it('should update a task successfully', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
          status: 'in_progress',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await PATCH(request, { params: { id: String(taskId) } });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.title).toBe('Updated Task');
      expect(data.status).toBe('in_progress');
    });

    it('should reject update without authentication', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await PATCH(request, { params: { id: String(taskId) } });
      expect(response.status).toBe(401);
    });

    it('should reject invalid task ID', async () => {
      const request = new NextRequest('http://localhost/api/tasks/invalid', {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await PATCH(request, { params: { id: 'invalid' } });
      expect(response.status).toBe(400);
    });

    it('should reject update with no fields', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await PATCH(request, { params: { id: String(taskId) } });
      expect(response.status).toBe(400);
    });

    it('should reject update with invalid token', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: 'token=invalid-token',
        },
      });

      const response = await PATCH(request, { params: { id: String(taskId) } });
      expect(response.status).toBe(401);
    });

    it('should reject update of non-existent task', async () => {
      const request = new NextRequest('http://localhost/api/tasks/99999', {
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Updated Task',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });

      const response = await PATCH(request, { params: { id: '99999' } });
      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /api/tasks/[id]', () => {
    let taskId: number;

    beforeEach(async () => {
      // Create a task for testing
      const createRequest = new NextRequest('http://localhost/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          title: 'Task to Delete',
          description: 'This will be deleted',
          status: 'pending',
          priority: 'medium',
        }),
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${authToken}`,
        },
      });
      const createResponse = await POST(createRequest);
      const task = await createResponse.json();
      taskId = task.id;
    });

    it('should delete a task successfully', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Cookie: `token=${authToken}`,
        },
      });

      const response = await DELETE(request, {
        params: { id: String(taskId) },
      });
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Task deleted successfully');
    });

    it('should reject delete without authentication', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      const response = await DELETE(request, {
        params: { id: String(taskId) },
      });
      expect(response.status).toBe(401);
    });

    it('should reject invalid task ID', async () => {
      const request = new NextRequest('http://localhost/api/tasks/invalid', {
        method: 'DELETE',
        headers: {
          Cookie: `token=${authToken}`,
        },
      });

      const response = await DELETE(request, { params: { id: 'invalid' } });
      expect(response.status).toBe(400);
    });

    it('should reject delete with invalid token', async () => {
      const request = new NextRequest(`http://localhost/api/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Cookie: 'token=invalid-token',
        },
      });

      const response = await DELETE(request, {
        params: { id: String(taskId) },
      });
      expect(response.status).toBe(401);
    });

    it('should reject delete of non-existent task', async () => {
      const request = new NextRequest('http://localhost/api/tasks/99999', {
        method: 'DELETE',
        headers: {
          Cookie: `token=${authToken}`,
        },
      });

      const response = await DELETE(request, { params: { id: '99999' } });
      expect(response.status).toBe(404);
    });
  });
});
