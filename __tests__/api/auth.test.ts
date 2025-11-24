import { POST as registerPOST } from '@/app/api/auth/register/route';
import { POST as loginPOST } from '@/app/api/auth/login/route';
import { NextRequest } from 'next/server';
import { initDatabase, closeDatabase } from '@/lib/db';

// Mock environment variables
process.env.DATABASE_URL = process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';

describe('Authentication API', () => {
  beforeAll(async () => {
    await initDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Test1234',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await registerPOST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data.user).toHaveProperty('id');
      expect(data.user.username).toBe('testuser');
      expect(data.user.email).toBe('test@example.com');
    });

    it('should reject invalid email format', async () => {
      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: 'testuser2',
          email: 'invalid-email',
          password: 'Test1234',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await registerPOST(request);
      expect(response.status).toBe(400);
    });

    it('should reject weak password', async () => {
      const request = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: 'testuser3',
          email: 'test2@example.com',
          password: 'weak',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await registerPOST(request);
      expect(response.status).toBe(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      // First register a user
      const registerRequest = new NextRequest('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          username: 'loginuser',
          email: 'login@example.com',
          password: 'Test1234',
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      await registerPOST(registerRequest);

      // Then try to login
      const loginRequest = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'login@example.com',
          password: 'Test1234',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await loginPOST(loginRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.user).toHaveProperty('id');
      expect(response.cookies.get('token')).toBeDefined();
    });

    it('should reject invalid credentials', async () => {
      const request = new NextRequest('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: 'nonexistent@example.com',
          password: 'WrongPassword',
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      const response = await loginPOST(request);
      expect(response.status).toBe(401);
    });
  });
});

