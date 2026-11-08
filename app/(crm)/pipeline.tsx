// ─────────────────────────────────────────────────────────────
//  Universal CRM — Pipeline Screen (Screen 8)
//  Stage column tabs, progress bar, lead cards with Move button
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line, Rect } from 'react-native-svg';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

const STAGES = [
  { id: 'inquiry', label: 'Inquiry', short: 'Inquiry', count: 24, order: 1 },
  { id: 'visit-scheduled', label: 'Visit Scheduled', short: 'Visit Sch.', count: 18, order: 2 },
  { id: 'visit-done', label: 'Site Visit Done', short: 'Visit Done', count: 18, order: 3 },
  { id: 'offer', label: 'Offer Stage', short: 'Offer', count: 9, order: 4 },
  { id: 'negotiation', label: 'Negotiation', short: 'Negotiation', count: 5, order: 5 },
  { id: 'closed', label: 'Closed', short: 'Closed', count: 2, order: 6 },
];

const LEADS_BY_STAGE: Record<string, Array<{
  id: string; initials: string; name: string; detail: string;
  amount: string; followup: string; avatarBg: string;
}>> = {
  'visit-done': [
    { id: '1', initials: 'AM', name: 'Aarav Mehta', detail: '2BHK · Gachibowli', amount: '₹85L', followup: 'Today 4:30 PM', avatarBg: '#B8C5B2' },
    { id: '2', initials: 'KM', name: 'Kabir Malhotra', detail: '3BHK · Kokapet', amount: '₹1.1 Cr', followup: 'Tomorrow 11 AM', avatarBg: colors.accent },
    { id: '3', initials: 'SS', name: 'Sana Sheikh', detail: 'Villa · Adibatla', amount: '₹1.4 Cr', followup: 'Fri, 5 PM', avatarBg: '#B8C5B2' },
  ],
  inquiry: [
    { id: '4', initials: 'FK', name: 'Fatima Khan', detail: 'Plot · Shadnagar', amount: '₹48L', followup: '', avatarBg: '#B8C5B2' },
  ],
  offer: [
    { id: '5', initials: 'DS', name: 'Diya Sharma', detail: '3BHK · Madhapur', amount: '₹92L', followup: 'Today, 6 PM', avatarBg: colors.accent },
  ],
};

function FilterIcon({ color = '#252A26' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="11" y1="18" x2="13" y2="18" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function ArrowRightIcon({ color = '#252A26', size = 14 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 5 19 12 12 19" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRightIcon({ color = '#252A26', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="9 18 15 12 9 6" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function InfoIcon({ color = '#252A26', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.75} />
      <Line x1="12" y1="16" x2="12" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="12" y1="8" x2="12.01" y2="8" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
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

export default function PipelineScreen() {
  const insets = useSafeAreaInsets();
  const [activeStage, setActiveStage] = useState('visit-done');

  const stage = STAGES.find((s) => s.id === activeStage)!;
  const stageLeads = LEADS_BY_STAGE[activeStage] ?? [];
  const stageProgress = stage.order / STAGES.length;

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
          <View>
            <Text style={styles.title}>Pipeline</Text>
            <Text style={styles.subtitle}>Real Estate · 6 stages</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} activeOpacity={0.75}>
            <FilterIcon color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Stage Tabs (Horizontal Scroll) ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stageTabs}
        >
          {STAGES.map((s) => {
            const isActive = s.id === activeStage;
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.stageTab, isActive && styles.stageTabActive]}
                onPress={() => setActiveStage(s.id)}
                activeOpacity={0.75}
              >
                <Text style={[styles.stageTabLabel, isActive && styles.stageTabLabelActive]}>
                  {s.short}
                </Text>
                <View style={[styles.stageCountBadge, isActive && styles.stageCountBadgeActive]}>
                  <Text style={[styles.stageCountText, isActive && styles.stageCountTextActive]}>
                    {s.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* ── Progress Bar ── */}
        <View style={styles.progressSection}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressBar, { width: `${stageProgress * 100}%` }]} />
          </View>
          <Text style={styles.progressLabel}>
            Stage {stage.order} of {STAGES.length} · {stage.label}
          </Text>
        </View>

        {/* ── Lead Cards ── */}
        {stageLeads.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No leads in this stage</Text>
          </View>
        ) : (
          stageLeads.map((lead) => (
            <TouchableOpacity
              key={lead.id}
              style={styles.leadCard}
              activeOpacity={0.75}
              onPress={() => router.push('/(crm)/lead-details' as any)}
            >
              <View style={[styles.avatar, { backgroundColor: lead.avatarBg }]}>
                <Text style={styles.avatarText}>{lead.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.leadTopRow}>
                  <Text style={styles.leadName}>{lead.name}</Text>
                  <TouchableOpacity style={styles.moveBtn} activeOpacity={0.75}>
                    <ArrowRightIcon color={colors.textPrimary} size={12} />
                    <Text style={styles.moveBtnText}>Move</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.leadDetail}>{lead.detail} · {lead.amount}</Text>
                {lead.followup ? (
                  <View style={styles.followupRow}>
                    <ClockIcon size={12} color={colors.accent} />
                    <Text style={styles.followupText}>{lead.followup}</Text>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity onPress={() => router.push('/(crm)/lead-details' as any)}>
                <ChevronRightIcon color={colors.textSecondary} size={16} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}

        {/* ── Info Banner ── */}
        <View style={styles.infoBanner}>
          <InfoIcon color={colors.textSecondary} size={16} />
          <Text style={styles.infoText}>
            Switch niche in Settings to preview Gym, Agency or Travel stages.
          </Text>
        </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageTabs: { gap: 8, paddingRight: 4 },
  stageTab: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 6,
    minWidth: 72,
  },
  stageTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  stageTabLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: colors.textPrimary },
  stageTabLabelActive: { color: colors.textInverse },
  stageCountBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageCountBadgeActive: { backgroundColor: colors.accent },
  stageCountText: { fontFamily: 'Manrope_700Bold', fontSize: 13, color: colors.textPrimary },
  stageCountTextActive: { color: colors.textInverse },
  progressSection: { gap: 6 },
  progressTrack: { height: 6, backgroundColor: colors.bgMuted, borderRadius: 3, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: colors.accent, borderRadius: 3 },
  progressLabel: { ...textStyles.caption, color: colors.textSecondary, textAlign: 'right', fontSize: 12 },
  leadCard: {
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textInverse },
  leadTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 },
  leadName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary, flex: 1 },
  moveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moveBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: colors.textPrimary },
  leadDetail: { ...textStyles.caption, color: colors.textSecondary, fontSize: 13 },
  followupRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  followupText: { ...textStyles.caption, color: colors.accent, fontFamily: 'Manrope_600SemiBold', fontSize: 12 },
  emptyCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: { ...textStyles.body, color: colors.textSecondary },
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.bgMuted,
    borderRadius: radius.card,
    padding: 14,
    marginTop: -4,
  },
  infoText: { ...textStyles.caption, color: colors.textSecondary, flex: 1, lineHeight: 18 },
});

