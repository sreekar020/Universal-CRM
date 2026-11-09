// ─────────────────────────────────────────────────────────────
//  Universal CRM — Interactive CRM Store (Zustand)
//  Manages leads, tasks, notifications, and active niche reactivity
// ─────────────────────────────────────────────────────────────

import { create } from 'zustand';
import { BusinessNicheId, BUSINESS_NICHES, PipelineStage } from '../types/niche';

export interface Lead {
  id: string;
  initials: string;
  name: string;
  phone: string;
  email?: string;
  amount: string;
  detail: string;
  stageId: string;
  stageLabel: string;
  stageFilter: 'All' | 'New' | 'In Progress' | 'Due' | 'Won';
  source: 'WhatsApp' | 'Manual' | 'Website' | 'Referral';
  followup?: string;
  followupColor?: string;
  avatarBg: string;
  nicheId: BusinessNicheId;
  tags?: string[];
  notes?: string;
  preferredArea?: string;
  propertyType?: string;
}

export interface TaskItem {
  id: string;
  name: string;
  sub: string;
  assignee: string | null;
  done: boolean;
  overdue: boolean;
  tab: 'Today' | 'Upcoming' | 'Done';
}

export interface NotificationItem {
  id: string;
  type: 'alarm' | 'chat' | 'arrow' | 'wallet' | 'person';
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  group: 'TODAY' | 'YESTERDAY';
}

interface CrmState {
  currentNicheId: BusinessNicheId;
  leads: Lead[];
  tasks: TaskItem[];
  notifications: NotificationItem[];
  activePipelineStageId: string;

  // Actions
  setCurrentNiche: (nicheId: BusinessNicheId) => void;
  setActivePipelineStage: (stageId: string) => void;
  addLead: (lead: Omit<Lead, 'id' | 'initials' | 'avatarBg'>) => void;
  moveLeadStage: (leadId: string, nextStageId: string, nextStageLabel: string) => void;
  toggleTaskDone: (taskId: string) => void;
  addTask: (task: Omit<TaskItem, 'id'>) => void;
  markAllNotificationsRead: () => void;
}

const INITIAL_LEADS: Lead[] = [
  {
    id: '1',
    initials: 'AM',
    name: 'Aarav Mehta',
    amount: '₹85L',
    phone: '+91 98200 12345',
    email: 'aarav.m@gmail.com',
    detail: '2BHK, Gachibowli',
    stageId: 'site-visit-done',
    stageLabel: 'Site Visit Done',
    stageFilter: 'In Progress',
    source: 'WhatsApp',
    followup: 'Today, 4:30 PM',
    followupColor: '#C66A4A',
    avatarBg: '#B8C5B2',
    nicheId: 'real-estate',
    tags: ['Hot', 'Site visit'],
    notes: 'Prefers high floor, ready to close by month end.',
    preferredArea: 'Gachibowli',
    propertyType: '2BHK Apartment',
  },
  {
    id: '2',
    initials: 'DS',
    name: 'Diya Sharma',
    amount: '₹92L',
    phone: '+91 99870 44556',
    email: 'diya.s@gmail.com',
    detail: '3BHK, Madhapur',
    stageId: 'offer',
    stageLabel: 'Offer',
    stageFilter: 'In Progress',
    source: 'WhatsApp',
    followup: 'Today, 6 PM',
    followupColor: '#C66A4A',
    avatarBg: '#C66A4A',
    nicheId: 'real-estate',
    tags: ['Hot'],
    notes: 'Loan pre-approved for ₹95L. Husband joins site visits on weekends.',
    preferredArea: 'Madhapur',
    propertyType: '3BHK Apartment',
  },
  {
    id: '3',
    initials: 'KM',
    name: 'Kabir Malhotra',
    amount: '₹1.1 Cr',
    phone: '+91 98333 44556',
    email: 'kabir.m@gmail.com',
    detail: '3BHK · Kokapet',
    stageId: 'site-visit-done',
    stageLabel: 'Site Visit Done',
    stageFilter: 'In Progress',
    source: 'WhatsApp',
    followup: 'Tomorrow 11 AM',
    followupColor: '#77786F',
    avatarBg: '#C66A4A',
    nicheId: 'real-estate',
    tags: ['Site visit'],
  },
  {
    id: '4',
    initials: 'SS',
    name: 'Sana Sheikh',
    amount: '₹1.4 Cr',
    phone: '+91 98444 55667',
    email: 'sana.s@gmail.com',
    detail: 'Villa · Adibatla',
    stageId: 'site-visit-done',
    stageLabel: 'Site Visit Done',
    stageFilter: 'In Progress',
    source: 'Manual',
    followup: 'Fri, 5 PM',
    followupColor: '#77786F',
    avatarBg: '#B8C5B2',
    nicheId: 'real-estate',
  },
  {
    id: '5',
    initials: 'RI',
    name: 'Rohan Iyer',
    amount: '₹1.6 Cr',
    phone: '+91 98111 22334',
    email: 'rohan.i@gmail.com',
    detail: 'Villa, Kondapur',
    stageId: 'negotiation',
    stageLabel: 'Negotiation',
    stageFilter: 'In Progress',
    source: 'Manual',
    followup: 'Tomorrow',
    followupColor: '#77786F',
    avatarBg: '#B8C5B2',
    nicheId: 'real-estate',
  },
  {
    id: '6',
    initials: 'FK',
    name: 'Fatima Khan',
    amount: '₹48L',
    phone: '+91 97654 33221',
    email: 'fatima.k@gmail.com',
    detail: 'Plot, Shadnagar',
    stageId: 'inquiry',
    stageLabel: 'Inquiry',
    stageFilter: 'New',
    source: 'Manual',
    followup: '',
    avatarBg: '#B8C5B2',
    nicheId: 'real-estate',
  },
];

const INITIAL_TASKS: TaskItem[] = [
  {
    id: '1',
    name: 'Call Rohan Iyer — overdue by 1 day',
    sub: 'Negotiation · Villa Kondapur · ₹1.6 Cr',
    assignee: null,
    done: false,
    overdue: true,
    tab: 'Today',
  },
  {
    id: '2',
    name: 'Aarav Mehta',
    sub: 'Site visit recap · 4:30 PM',
    assignee: 'Priya',
    done: true,
    overdue: false,
    tab: 'Today',
  },
  {
    id: '3',
    name: 'Diya Sharma',
    sub: 'Share offer letter · 6:00 PM',
    assignee: 'You',
    done: false,
    overdue: false,
    tab: 'Today',
  },
  {
    id: '4',
    name: 'Sana Sheikh',
    sub: 'Confirm visit slot · 7:15 PM',
    assignee: 'Arjun',
    done: false,
    overdue: false,
    tab: 'Today',
  },
  {
    id: '5',
    name: 'Follow up on booking quote',
    sub: 'Sana Sheikh · Adibatla Villa',
    assignee: 'You',
    done: false,
    overdue: false,
    tab: 'Upcoming',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'alarm',
    title: 'Follow-up in 30 minutes',
    desc: 'Aarav Mehta · Site visit recap · 4:30 PM',
    time: '10 min ago',
    unread: true,
    group: 'TODAY',
  },
  {
    id: '2',
    type: 'chat',
    title: 'New WhatsApp enquiry',
    desc: 'Fatima Khan asked about Shadnagar plots',
    time: '1 hr ago',
    unread: true,
    group: 'TODAY',
  },
  {
    id: '3',
    type: 'arrow',
    title: 'Stage moved to Offer',
    desc: 'Diya Sharma · by Priya · ₹92L',
    time: 'Yesterday',
    unread: false,
    group: 'YESTERDAY',
  },
  {
    id: '4',
    type: 'wallet',
    title: 'Payment received ₹1,60,000',
    desc: 'INV-1893 · Rohan Iyer · via UPI',
    time: 'Yesterday',
    unread: false,
    group: 'YESTERDAY',
  },
  {
    id: '5',
    type: 'person',
    title: 'New team invite accepted',
    desc: 'Sneha joined as Coordinator',
    time: 'Yesterday',
    unread: false,
    group: 'YESTERDAY',
  },
];

export const useCrmStore = create<CrmState>((set, get) => ({
  currentNicheId: 'real-estate',
  leads: INITIAL_LEADS,
  tasks: INITIAL_TASKS,
  notifications: INITIAL_NOTIFICATIONS,
  activePipelineStageId: 'site-visit-done',

  setCurrentNiche: (nicheId: BusinessNicheId) => {
    const niche = BUSINESS_NICHES[nicheId];
    const firstStageId = niche.stages[0]?.id ?? 'inquiry';
    set({ currentNicheId: nicheId, activePipelineStageId: firstStageId });
  },

  setActivePipelineStage: (stageId: string) => {
    set({ activePipelineStageId: stageId });
  },

  addLead: (leadData) => {
    const initials = leadData.name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const colorsList = ['#B8C5B2', '#C66A4A', '#87947A', '#D8AF62'];
    const avatarBg = colorsList[Math.floor(Math.random() * colorsList.length)];

    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      initials,
      avatarBg,
    };

    set((state) => ({
      leads: [newLead, ...state.leads],
    }));
  },

  moveLeadStage: (leadId, nextStageId, nextStageLabel) => {
    set((state) => ({
      leads: state.leads.map((lead) =>
        lead.id === leadId
          ? {
              ...lead,
              stageId: nextStageId,
              stageLabel: nextStageLabel,
              stageFilter: nextStageId === 'closed' ? 'Won' : 'In Progress',
            }
          : lead
      ),
    }));
  },

  toggleTaskDone: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      ),
    }));
  },

  addTask: (taskData) => {
    const newTask: TaskItem = {
      ...taskData,
      id: Date.now().toString(),
    };
    set((state) => ({
      tasks: [newTask, ...state.tasks],
    }));
  },

  markAllNotificationsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, unread: false })),
    }));
  },
}));

