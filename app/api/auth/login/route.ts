import { NextRequest, NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '@/lib/auth';
import { loginSchema } from '@/lib/validation';
import { initDatabase } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initDatabase();

    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    const user = await authenticateUser(
      validatedData.email,
      validatedData.password
    );

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: { id: user.id, username: user.username, email: user.email },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed. Please try again.' },
      { status: 500 }
    );
  }
}
