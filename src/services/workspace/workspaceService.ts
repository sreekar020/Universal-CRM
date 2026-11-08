// ─────────────────────────────────────────────────────────────
//  Universal CRM — Mock Workspace Service
// ─────────────────────────────────────────────────────────────

import type { Workspace } from '../../types';
import type { BusinessSetupFormData } from '../../schemas';
import type { BusinessNicheId } from '../../types/niche';

const delay = (ms: number) => new Promise<void>((res) => setTimeout(res, ms));

function generateId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const MOCK_WORKSPACES: Workspace[] = [
  {
    id: 'ws_001',
    ownerId: 'usr_001',
    name: 'UrbanNest Realty',
    phone: '+91 98480 12345',
    email: 'hello@urbannest.in',
    address: 'Plot 12, Jubilee Hills, Hyderabad',
    nicheId: 'real-estate',
    createdAt: '2024-11-01T09:00:00Z',
  },
];

export interface WorkspaceServiceInterface {
  createWorkspace(
    ownerId: string,
    nicheId: BusinessNicheId,
    data: BusinessSetupFormData
  ): Promise<Workspace>;
  getWorkspaceByOwner(ownerId: string): Promise<Workspace | null>;
}

export const workspaceService: WorkspaceServiceInterface = {
  async createWorkspace(
    ownerId: string,
    nicheId: BusinessNicheId,
    data: BusinessSetupFormData
  ): Promise<Workspace> {
    await delay(1500);

    const workspace: Workspace = {
      id: `ws_${generateId()}`,
      ownerId,
      name: data.businessName,
      phone: data.businessPhone,
      email: data.businessEmail,
      address: data.businessAddress,
      nicheId,
      createdAt: new Date().toISOString(),
    };

    MOCK_WORKSPACES.push(workspace);
    return workspace;
  },

  async getWorkspaceByOwner(ownerId: string): Promise<Workspace | null> {
    await delay(300);
    return MOCK_WORKSPACES.find((ws) => ws.ownerId === ownerId) ?? null;
  },
};
