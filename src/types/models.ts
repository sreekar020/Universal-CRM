// ─────────────────────────────────────────────────────────────
//  Universal CRM — Core Domain Types
// ─────────────────────────────────────────────────────────────

import type { BusinessNicheId } from './niche';

// ── Auth ──────────────────────────────────────────────────────

export type AppAuthState = 'unauthenticated' | 'onboarding' | 'ready';

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: string;
}

// ── Workspace ─────────────────────────────────────────────────

export interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  nicheId: BusinessNicheId;
  createdAt: string;
}

// ── Lead ──────────────────────────────────────────────────────

export type LeadSource =
  | 'website'
  | 'referral'
  | 'social-media'
  | 'walk-in'
  | 'phone-call'
  | 'email'
  | 'other';

export interface Lead {
  id: string;
  workspaceId: string;
  name: string;
  email?: string;
  phone: string;
  source: LeadSource;
  stageId: string;
  assigneeId?: string;
  customFields: Record<string, string>;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  followUpAt?: string;
}

// ── Contact ───────────────────────────────────────────────────

export interface Contact {
  id: string;
  workspaceId: string;
  name: string;
  email?: string;
  phone: string;
  company?: string;
  avatarUrl?: string;
  leadIds: string[];
  createdAt: string;
}

// ── Activity ──────────────────────────────────────────────────

export type ActivityType =
  | 'note'
  | 'call'
  | 'email'
  | 'stage-change'
  | 'follow-up'
  | 'task-completed';

export interface Activity {
  id: string;
  leadId: string;
  userId: string;
  type: ActivityType;
  title: string;
  body?: string;
  createdAt: string;
}

// ── Task ──────────────────────────────────────────────────────

export type TaskStatus = 'pending' | 'completed' | 'overdue';

export interface Task {
  id: string;
  workspaceId: string;
  title: string;
  description?: string;
  dueAt: string;
  status: TaskStatus;
  assigneeId?: string;
  leadId?: string;
  createdAt: string;
}

// ── Team ──────────────────────────────────────────────────────

export type TeamRole = 'owner' | 'admin' | 'agent' | 'member';
export type InviteStatus = 'pending' | 'accepted' | 'declined';

export interface TeamMember {
  id: string;
  workspaceId: string;
  userId: string;
  name: string;
  email: string;
  role: TeamRole;
  inviteStatus: InviteStatus;
  avatarUrl?: string;
  assignedLeads: number;
  joinedAt?: string;
}

// ── Notification ──────────────────────────────────────────────

export type NotificationType = 'lead' | 'reminder' | 'team' | 'system';

export interface AppNotification {
  id: string;
  workspaceId: string;
  type: NotificationType;
  title: string;
  body: string;
  read: boolean;
  relatedId?: string;
  createdAt: string;
}

// ── Document ──────────────────────────────────────────────────

export type DocumentType = 'quote' | 'invoice';
export type DocumentStatus = 'draft' | 'sent' | 'accepted' | 'paid';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Document {
  id: string;
  workspaceId: string;
  contactId: string;
  type: DocumentType;
  status: DocumentStatus;
  lineItems: LineItem[];
  taxPercent: number;
  notes?: string;
  createdAt: string;
}
