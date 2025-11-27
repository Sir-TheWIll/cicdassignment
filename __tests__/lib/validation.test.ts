import { registerSchema, loginSchema, taskSchema } from '@/lib/validation';

describe('Validation Schemas', () => {
  describe('registerSchema', () => {
    it('should validate correct registration data', () => {
      const validData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test1234',
      };
      expect(() => registerSchema.parse(validData)).not.toThrow();
    });

    it('should reject short username', () => {
      const invalidData = {
        username: 'ab',
        email: 'test@example.com',
        password: 'Test1234',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('should reject invalid email', () => {
      const invalidData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Test1234',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });

    it('should reject weak password', () => {
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'weak',
      };
      expect(() => registerSchema.parse(invalidData)).toThrow();
    });
  });

  describe('taskSchema', () => {
    it('should validate correct task data', () => {
      const validData = {
        title: 'Test Task',
        description: 'Task description',
        status: 'pending',
        priority: 'high',
      };
      expect(() => taskSchema.parse(validData)).not.toThrow();
    });

    it('should reject empty title', () => {
      const invalidData = {
        title: '',
        description: 'Task description',
      };
      expect(() => taskSchema.parse(invalidData)).toThrow();
    });
  });
});
