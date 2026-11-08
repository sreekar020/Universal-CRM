// ─────────────────────────────────────────────────────────────
//  Universal CRM — Mock Authentication Service
//  Replace internals with real API calls when backend is ready.
//  The interface contract must not change.
// ─────────────────────────────────────────────────────────────

import type { User, AuthSession } from '../../types';
import type { RegisterFormData, LoginFormData } from '../../schemas';

// ── Mock data store ───────────────────────────────────────────

const MOCK_USERS: Array<User & { passwordHash: string }> = [
  {
    id: 'usr_001',
    fullName: 'Sreekar Reddy',
    email: 'sreekar@urbannest.in',
    phone: '+91 98480 12345',
    passwordHash: 'Demo@1234', // stored in plain text only for dev mock
    createdAt: '2024-11-01T09:00:00Z',
  },
];

// Simulate network delay
const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function generateToken(): string {
  return `mock_tok_${generateId()}_${Date.now()}`;
}

// ── Service interface ─────────────────────────────────────────

export interface AuthServiceInterface {
  register(data: RegisterFormData): Promise<AuthSession>;
  login(data: LoginFormData): Promise<AuthSession>;
  sendResetLink(email: string): Promise<{ sent: boolean; destination: string }>;
  sendResetOtp(phone: string): Promise<{ sent: boolean; destination: string }>;
  logout(): Promise<void>;
}

// ── Mock implementation ───────────────────────────────────────

export const authService: AuthServiceInterface = {
  async register(data: RegisterFormData): Promise<AuthSession> {
    await delay(1200);

    const existing = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === data.email.toLowerCase()
    );
    if (existing) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User & { passwordHash: string } = {
      id: `usr_${generateId()}`,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      passwordHash: data.password,
      createdAt: new Date().toISOString(),
    };

    MOCK_USERS.push(newUser);

    const session: AuthSession = {
      user: {
        id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
        phone: newUser.phone,
        createdAt: newUser.createdAt,
      },
      token: generateToken(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return session;
  },

  async login(data: LoginFormData): Promise<AuthSession> {
    await delay(1000);

    const user = MOCK_USERS.find(
      (u) =>
        u.email.toLowerCase() === data.identifier.toLowerCase() ||
        u.phone.replace(/\s/g, '') === data.identifier.replace(/\s/g, '')
    );

    if (!user || user.passwordHash !== data.password) {
      throw new Error('Incorrect password. Please try again.');
    }

    const session: AuthSession = {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
      },
      token: generateToken(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };

    return session;
  },

  async sendResetLink(email: string): Promise<{ sent: boolean; destination: string }> {
    await delay(1500);
    // In development, we simulate delivery regardless of whether the account exists
    // so as not to leak account information. Backend must enforce the same.
    return { sent: true, destination: email };
  },

  async sendResetOtp(phone: string): Promise<{ sent: boolean; destination: string }> {
    await delay(1500);
    return { sent: true, destination: phone };
  },

  async logout(): Promise<void> {
    await delay(300);
  },
};
