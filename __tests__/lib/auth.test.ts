import {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  createUser,
  authenticateUser,
} from '@/lib/auth';
import { initDatabase, closeDatabase } from '@/lib/db';

// Mock environment variables
process.env.DATABASE_URL =
  process.env.DATABASE_URL || 'postgresql://test:test@localhost:5432/testdb';
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret-key';

describe('Auth Library', () => {
  beforeAll(async () => {
    await initDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const password = 'Test1234';
      const hash = await hashPassword(password);
      expect(hash).toBeDefined();
      expect(hash).not.toBe(password);
      expect(hash.length).toBeGreaterThan(0);
    });
  });

  describe('verifyPassword', () => {
    it('should verify correct password', async () => {
      const password = 'Test1234';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(password, hash);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const password = 'Test1234';
      const wrongPassword = 'WrongPassword';
      const hash = await hashPassword(password);
      const isValid = await verifyPassword(wrongPassword, hash);
      expect(isValid).toBe(false);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', () => {
      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };
      const token = generateToken(user);
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.').length).toBe(3); // JWT has 3 parts
    });
  });

  describe('verifyToken', () => {
    it('should verify valid token', () => {
      const user = {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
      };
      const token = generateToken(user);
      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.id).toBe(user.id);
      expect(decoded?.username).toBe(user.username);
      expect(decoded?.email).toBe(user.email);
    });

    it('should reject invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const decoded = verifyToken(invalidToken);
      expect(decoded).toBeNull();
    });

    it('should reject empty token', () => {
      const decoded = verifyToken('');
      expect(decoded).toBeNull();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const user = await createUser(
        'authuser',
        'authuser@example.com',
        'Test1234'
      );
      expect(user).toHaveProperty('id');
      expect(user.username).toBe('authuser');
      expect(user.email).toBe('authuser@example.com');
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate user with correct credentials', async () => {
      // Create a user first
      await createUser('authuser2', 'authuser2@example.com', 'Test1234');

      const user = await authenticateUser('authuser2@example.com', 'Test1234');
      expect(user).not.toBeNull();
      expect(user?.email).toBe('authuser2@example.com');
    });

    it('should reject incorrect password', async () => {
      // User already created above
      const user = await authenticateUser(
        'authuser2@example.com',
        'WrongPassword'
      );
      expect(user).toBeNull();
    });

    it('should reject non-existent user', async () => {
      const user = await authenticateUser(
        'nonexistent@example.com',
        'Test1234'
      );
      expect(user).toBeNull();
    });
  });
});
