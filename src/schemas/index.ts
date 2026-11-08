// ─────────────────────────────────────────────────────────────
//  Universal CRM — Zod Validation Schemas
// ─────────────────────────────────────────────────────────────

import { z } from 'zod';

// ── Registration ─────────────────────────────────────────────

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Full name must be at least 2 characters')
      .max(80, 'Full name is too long')
      .regex(/^[a-zA-Z\s'-]+$/, 'Full name contains invalid characters'),

    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),

    phone: z
      .string()
      .min(6, 'Phone number is too short')
      .max(15, 'Phone number is too long')
      .regex(/^[0-9\s\-\+\(\)]+$/, 'Please enter a valid phone number'),

    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),

    confirmPassword: z.string().min(1, 'Please confirm your password'),

    agreedToTerms: z
      .boolean()
      .refine((v) => v === true, 'You must accept the Terms of Service to continue'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// ── Login ─────────────────────────────────────────────────────

export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, 'Email or phone number is required'),

  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ── Forgot Password ───────────────────────────────────────────

export const forgotPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

export const forgotPasswordPhoneSchema = z.object({
  phone: z
    .string()
    .min(6, 'Phone number is too short')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Please enter a valid phone number'),
});

export type ForgotPasswordEmailData = z.infer<typeof forgotPasswordEmailSchema>;
export type ForgotPasswordPhoneData = z.infer<typeof forgotPasswordPhoneSchema>;

// ── Business Setup ────────────────────────────────────────────

export const businessSetupSchema = z.object({
  businessName: z
    .string()
    .min(2, 'Business name must be at least 2 characters')
    .max(100, 'Business name is too long'),

  businessPhone: z
    .string()
    .min(6, 'Business phone is too short')
    .max(15, 'Business phone is too long')
    .regex(/^[0-9\s\-\+\(\)]+$/, 'Please enter a valid phone number'),

  businessEmail: z
    .string()
    .min(1, 'Business email is required')
    .email('Please enter a valid business email'),

  businessAddress: z.string().max(200, 'Address is too long').optional(),
});

export type BusinessSetupFormData = z.infer<typeof businessSetupSchema>;
