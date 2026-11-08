// ─────────────────────────────────────────────────────────────
//  Universal CRM — Business Niche Types
// ─────────────────────────────────────────────────────────────

export type BusinessNicheId =
  | 'real-estate'
  | 'marketing-agency'
  | 'gym-fitness'
  | 'travel-tours';

export interface PipelineStage {
  id: string;
  label: string;
  order: number;
  color?: string;
}

export interface BusinessNiche {
  id: BusinessNicheId;
  title: string;
  description: string;
  pipelineLabel: string;
  stages: PipelineStage[];
  customFields: string[];
}

export const BUSINESS_NICHES: Record<BusinessNicheId, BusinessNiche> = {
  'real-estate': {
    id: 'real-estate',
    title: 'Real Estate',
    description: 'Manage property enquiries and site visits.',
    pipelineLabel: 'Real Estate pipeline',
    stages: [
      { id: 'inquiry', label: 'Inquiry', order: 1 },
      { id: 'site-visit-scheduled', label: 'Site Visit Scheduled', order: 2 },
      { id: 'site-visit-done', label: 'Site Visit Done', order: 3 },
      { id: 'offer', label: 'Offer', order: 4 },
      { id: 'negotiation', label: 'Negotiation', order: 5 },
      { id: 'closed', label: 'Closed', order: 6 },
    ],
    customFields: ['Property Type', 'Budget Range', 'Preferred Location', 'Possession Timeline'],
  },
  'marketing-agency': {
    id: 'marketing-agency',
    title: 'Marketing Agency',
    description: 'Manage prospects, proposals and clients.',
    pipelineLabel: 'Marketing pipeline',
    stages: [
      { id: 'inquiry', label: 'Inquiry', order: 1 },
      { id: 'discovery-call', label: 'Discovery Call', order: 2 },
      { id: 'proposal-sent', label: 'Proposal Sent', order: 3 },
      { id: 'negotiation', label: 'Negotiation', order: 4 },
      { id: 'contract-signed', label: 'Contract Signed', order: 5 },
      { id: 'active-client', label: 'Active Client', order: 6 },
    ],
    customFields: ['Service Interest', 'Monthly Budget', 'Current Agency', 'Campaign Type'],
  },
  'gym-fitness': {
    id: 'gym-fitness',
    title: 'Gym & Fitness',
    description: 'Track enquiries, trials and memberships.',
    pipelineLabel: 'Fitness pipeline',
    stages: [
      { id: 'enquiry', label: 'Enquiry', order: 1 },
      { id: 'trial-booked', label: 'Trial Booked', order: 2 },
      { id: 'trial-done', label: 'Trial Done', order: 3 },
      { id: 'plan-offered', label: 'Plan Offered', order: 4 },
      { id: 'joined', label: 'Joined', order: 5 },
      { id: 'renewal-due', label: 'Renewal Due', order: 6 },
    ],
    customFields: ['Fitness Goal', 'Preferred Plan', 'Health Conditions', 'Preferred Timings'],
  },
  'travel-tours': {
    id: 'travel-tours',
    title: 'Travel & Tours',
    description: 'Manage trip enquiries and bookings.',
    pipelineLabel: 'Travel pipeline',
    stages: [
      { id: 'inquiry', label: 'Inquiry', order: 1 },
      { id: 'itinerary-sent', label: 'Itinerary Sent', order: 2 },
      { id: 'revision', label: 'Revision', order: 3 },
      { id: 'confirmed', label: 'Confirmed', order: 4 },
      { id: 'payment-received', label: 'Payment Received', order: 5 },
      { id: 'trip-completed', label: 'Trip Completed', order: 6 },
    ],
    customFields: ['Destination', 'Travel Dates', 'Group Size', 'Budget Per Person'],
  },
};

export function getNiche(id: BusinessNicheId): BusinessNiche {
  return BUSINESS_NICHES[id];
}

export function getPipelineSummary(niche: BusinessNiche, maxStages = 4): string {
  return niche.stages
    .slice(0, maxStages)
    .map((s) => s.label)
    .join(' → ');
}
