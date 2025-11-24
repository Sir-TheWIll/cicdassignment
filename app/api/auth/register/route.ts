import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';
import { registerSchema } from '@/lib/validation';
import { initDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();

    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const user = await createUser(
      validatedData.username,
      validatedData.email,
      validatedData.password
    );

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user.id, username: user.username, email: user.email } },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error.code === '23505') {
      // PostgreSQL unique constraint violation
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 409 }
      );
    }

    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
}

