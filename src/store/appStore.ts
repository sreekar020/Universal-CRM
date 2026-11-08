// ─────────────────────────────────────────────────────────────
//  Universal CRM — App State Store (Zustand)
//  Manages auth session, onboarding state, and workspace.
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';
import type { User, AuthSession, Workspace, AppAuthState } from '../types';
import type { BusinessNicheId } from '../types/niche';

interface OnboardingState {
  selectedNiche: BusinessNicheId | null;
  workspace: Workspace | null;
}

interface AppState {
  // Auth
  authState: AppAuthState;
  session: AuthSession | null;
  user: User | null;

  // Onboarding
  onboarding: OnboardingState;

  // Actions
  setSession: (session: AuthSession) => void;
  setOnboardingNiche: (nicheId: BusinessNicheId) => void;
  setWorkspace: (workspace: Workspace) => void;
  completeOnboarding: (workspace: Workspace) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // ── Initial state ──────────────────────────────────────────
  authState: 'unauthenticated',
  session: null,
  user: null,
  onboarding: {
    selectedNiche: null,
    workspace: null,
  },

  // ── Actions ────────────────────────────────────────────────

  setSession: (session: AuthSession) =>
    set({
      session,
      user: session.user,
      authState: 'onboarding',
    }),

  setOnboardingNiche: (nicheId: BusinessNicheId) =>
    set((state) => ({
      onboarding: { ...state.onboarding, selectedNiche: nicheId },
    })),

  setWorkspace: (workspace: Workspace) =>
    set((state) => ({
      onboarding: { ...state.onboarding, workspace },
    })),

  completeOnboarding: (workspace: Workspace) =>
    set((state) => ({
      authState: 'ready',
      onboarding: { ...state.onboarding, workspace },
    })),

  logout: () =>
    set({
      authState: 'unauthenticated',
      session: null,
      user: null,
      onboarding: { selectedNiche: null, workspace: null },
    }),
}));

// ── Selectors ──────────────────────────────────────────────────

export const selectAuthState = (s: AppState) => s.authState;
export const selectUser = (s: AppState) => s.user;
export const selectSession = (s: AppState) => s.session;
export const selectSelectedNiche = (s: AppState) => s.onboarding.selectedNiche;
export const selectWorkspace = (s: AppState) => s.onboarding.workspace;
