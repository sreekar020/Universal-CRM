// ─────────────────────────────────────────────────────────────
//  Universal CRM — Dashboard (Screen 6)
//  Active deals value hero, pipeline overview, follow-ups, recent leads
// ─────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, Polyline, Line } from 'react-native-svg';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

// ─── Mock data ────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { label: 'Site Visit Done', count: 18, pct: 0.75 },
  { label: 'Offer Stage', count: 9, pct: 0.45 },
  { label: 'Negotiation', count: 5, pct: 0.3 },
];

const FOLLOWUPS = [
  {
    id: '1',
    name: 'Aarav Mehta',
    time: '4:30 PM',
    note: 'Site visit recap · 2BHK, Gachibowli',
    type: 'call',
    urgent: true,
  },
  {
    id: '2',
    name: 'Diya Sharma',
    time: '6:00 PM',
    note: 'Share offer letter · ₹92L',
    type: 'chat',
    urgent: false,
  },
];

const RECENT_LEADS = [
  {
    id: '1',
    initials: 'AM',
    name: 'Aarav Mehta',
    amount: '₹85L',
    phone: '+91 98200 12345',
    detail: '2BHK Gachibowli',
    stage: 'Site Visit Done',
    source: 'WhatsApp',
    followup: 'Today, 4:30 PM',
    followupColor: colors.accent,
    avatarBg: '#B8C5B2',
  },
  {
    id: '2',
    initials: 'RI',
    name: 'Rohan Iyer',
    amount: '₹1.6 Cr',
    phone: '+91 98111 22334',
    detail: 'Villa, Kondapur',
    stage: 'Offer',
    source: 'Manual',
    followup: 'Tomorrow',
    followupColor: colors.textSecondary,
    avatarBg: colors.accent,
  },
];

function CallIcon({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChatIcon({ size = 20, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BellIcon({ size = 20, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PersonIcon({ size = 14, color = '#77786F' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={1.75} />
    </Svg>
  );
}

function ClockIcon({ size = 12, color = '#C66A4A' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.75} />
      <Polyline points="12 6 12 12 16 14" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SR</Text>
            </View>
            <View>
              <Text style={styles.greeting}>Good morning, Sreekar</Text>
              <View style={styles.workspaceRow}>
                <Text style={styles.workspaceName}>UrbanNest Realty</Text>
                <View style={styles.nichePill}>
                  <Text style={styles.nichePillText}>Real Estate</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={styles.bellBtn}
            onPress={() => router.push('/(crm)/notifications' as any)}
          >
            <BellIcon size={20} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* ── Hero Card: Active Deals Value ── */}
        <View style={styles.heroCard}>
          <Text style={styles.heroLabel}>ACTIVE DEALS VALUE</Text>
          <View style={styles.heroRow}>
            <View>
              <Text style={styles.heroAmount}>₹1.24 Cr</Text>
              <Text style={styles.heroSub}>+18% this month · 42 leads</Text>
            </View>
            <TouchableOpacity
              style={styles.addLeadBtn}
              onPress={() => router.push('/(crm)/add-lead' as any)}
              activeOpacity={0.85}
            >
              <Text style={styles.addLeadText}>+ Add Lead</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Metric Cards ── */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>128</Text>
            <Text style={styles.metricLabel}>Total Leads</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>14</Text>
            <Text style={styles.metricLabel}>New</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>6</Text>
            <Text style={styles.metricLabel}>Due Today</Text>
          </View>
        </View>

        {/* ── Pipeline Overview ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pipeline overview</Text>
          <TouchableOpacity onPress={() => router.push('/(crm)/pipeline' as any)}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          {PIPELINE_STAGES.map((stage, i) => (
            <View key={i} style={i > 0 ? { marginTop: 12 } : undefined}>
              <View style={styles.pipelineRow}>
                <Text style={styles.pipelineLabel}>{stage.label}</Text>
                <Text style={styles.pipelineCount}>{stage.count}</Text>
              </View>
              <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: `${stage.pct * 100}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* ── Today's Follow-ups ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's follow-ups</Text>
          <View style={styles.dueBadge}>
            <Text style={styles.dueBadgeText}>6 due</Text>
          </View>
        </View>
        {FOLLOWUPS.map((f) => (
          <TouchableOpacity
            key={f.id}
            style={[styles.followupCard, f.urgent && styles.followupCardUrgent]}
            activeOpacity={0.75}
            onPress={() => router.push('/(crm)/lead-details' as any)}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.followupName}>{f.name} · {f.time}</Text>
              <Text style={styles.followupNote}>{f.note}</Text>
            </View>
            <View style={[styles.followupIcon, f.type === 'call' ? styles.followupIconCall : styles.followupIconChat]}>
              {f.type === 'call'
                ? <CallIcon size={18} color="#fff" />
                : <ChatIcon size={18} color={colors.textPrimary} />
              }
            </View>
          </TouchableOpacity>
        ))}

        {/* ── Recent Leads ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent leads</Text>
          <TouchableOpacity onPress={() => router.push('/(crm)/leads' as any)}>
            <Text style={styles.viewAll}>See all</Text>
          </TouchableOpacity>
        </View>
        {RECENT_LEADS.map((lead) => (
          <TouchableOpacity
            key={lead.id}
            style={styles.leadCard}
            activeOpacity={0.75}
            onPress={() => router.push('/(crm)/lead-details' as any)}
          >
            <View style={[styles.leadAvatar, { backgroundColor: lead.avatarBg }]}>
              <Text style={styles.leadAvatarText}>{lead.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.leadTopRow}>
                <Text style={styles.leadName}>{lead.name}</Text>
                <Text style={styles.leadAmount}>{lead.amount}</Text>
              </View>
              <Text style={styles.leadSub}>{lead.phone} · {lead.detail}</Text>
              <View style={styles.leadMeta}>
                <View style={styles.stagePill}>
                  <Text style={styles.stagePillText}>{lead.stage}</Text>
                </View>
                <View style={styles.metaItem}>
                  <PersonIcon size={12} />
                  <Text style={styles.metaText}>{lead.source}</Text>
                </View>
                <View style={styles.metaItem}>
                  <ClockIcon size={12} color={lead.followupColor} />
                  <Text style={[styles.metaText, { color: lead.followupColor }]}>{lead.followup}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 16,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { ...textStyles.bodyMedium, color: colors.textInverse, fontFamily: 'Manrope_700Bold', fontSize: 14 },
  greeting: { ...textStyles.caption, color: colors.textSecondary },
  workspaceRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 1 },
  workspaceName: { ...textStyles.cardTitle, color: colors.textPrimary, fontSize: 15 },
  nichePill: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  nichePillText: { ...textStyles.caption, color: colors.textSecondary, fontFamily: 'Manrope_600SemiBold', fontSize: 11 },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bellDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent,
    borderWidth: 1.5,
    borderColor: colors.bgSurface,
  },
  // Hero Card
  heroCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.cardLg,
    padding: 20,
    gap: 10,
  },
  heroLabel: { ...textStyles.overline, color: 'rgba(255,254,250,0.6)', letterSpacing: 1 },
  heroRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroAmount: { fontFamily: 'Manrope_800ExtraBold', fontSize: 32, color: colors.textInverse, letterSpacing: -0.5 },
  heroSub: { ...textStyles.caption, color: colors.accentSecondary, marginTop: 2 },
  addLeadBtn: {
    backgroundColor: colors.accent,
    borderRadius: radius.button,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  addLeadText: { ...textStyles.button, color: colors.textInverse, fontSize: 14 },
  // Metric Cards
  metricsRow: { flexDirection: 'row', gap: 10 },
  metricCard: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    alignItems: 'flex-start',
  },
  metricValue: { fontFamily: 'Manrope_800ExtraBold', fontSize: 26, color: colors.textPrimary, letterSpacing: -0.5 },
  metricLabel: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  // Section
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  sectionTitle: { ...textStyles.sectionHeading, color: colors.textPrimary, fontSize: 18 },
  viewAll: { ...textStyles.bodyMedium, color: colors.primary, fontSize: 13 },
  dueBadge: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  dueBadgeText: { ...textStyles.caption, color: colors.textPrimary, fontFamily: 'Manrope_600SemiBold', fontSize: 12 },
  // Pipeline Card
  card: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginTop: -4,
  },
  pipelineRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  pipelineLabel: { ...textStyles.bodyMedium, color: colors.textPrimary, fontSize: 14 },
  pipelineCount: { ...textStyles.bodyMedium, color: colors.textSecondary, fontSize: 14 },
  progressTrack: { height: 6, backgroundColor: colors.bgMuted, borderRadius: 3, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
  // Follow-up Cards
  followupCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: -4,
  },
  followupCardUrgent: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  followupName: { ...textStyles.bodyMedium, color: colors.textPrimary, fontSize: 14, fontFamily: 'Manrope_600SemiBold' },
  followupNote: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  followupIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  followupIconCall: { backgroundColor: colors.primary },
  followupIconChat: { backgroundColor: colors.bgMuted, borderWidth: 1, borderColor: colors.border },
  // Lead Cards
  leadCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    marginTop: -4,
  },
  leadAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  leadAvatarText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textInverse },
  leadTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadName: { ...textStyles.bodyMedium, color: colors.textPrimary, fontFamily: 'Manrope_700Bold', fontSize: 15 },
  leadAmount: { ...textStyles.bodyMedium, color: colors.textPrimary, fontFamily: 'Manrope_700Bold', fontSize: 14 },
  leadSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  leadMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, flexWrap: 'wrap' },
  stagePill: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  stagePillText: { ...textStyles.caption, color: colors.textPrimary, fontFamily: 'Manrope_500Medium', fontSize: 11 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: { ...textStyles.caption, color: colors.textSecondary, fontSize: 11 },
});
