// ─────────────────────────────────────────────────────────────
//  Universal CRM — Lead Details Screen (Screen 9)
//  Action buttons, follow-up banner, lead info, activity timeline
// ─────────────────────────────────────────────────────────────

import React from 'react';
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

function ArrowLeftIcon({ color = '#252A26', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DotsIcon({ color = '#252A26', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="1.5" fill={color} />
      <Circle cx="19" cy="12" r="1.5" fill={color} />
      <Circle cx="5" cy="12" r="1.5" fill={color} />
    </Svg>
  );
}

function PhoneIcon({ size = 22, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChatIcon({ size = 22, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MailIcon({ size = 22, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="22,6 12,13 2,6" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CalendarIcon({ size = 22, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth={1.75} />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function AlarmIcon({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="13" r="8" stroke={color} strokeWidth={1.75} />
      <Polyline points="12 9 12 13 15 15" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="5" y1="3" x2="2" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="19" y1="3" x2="22" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

const TIMELINE = [
  { icon: 'alarm', title: 'Follow-up scheduled', desc: 'Call to discuss loan pre-approval · Today, 4:30 PM' },
  { icon: 'arrow', title: 'Stage changed', desc: 'Visit Scheduled   Visit Done · Yesterday' },
  { icon: 'phone', title: 'Call logged', desc: '12-min site visit walkthrough · Yesterday' },
  { icon: 'star', title: 'Lead created', desc: 'Via WhatsApp ad · 12 Oct' },
];

function TimelineIcon({ type }: { type: string }) {
  const bg = type === 'alarm' ? colors.accent : colors.bgMuted;
  const c = type === 'alarm' ? colors.textInverse : colors.textSecondary;
  let icon;
  if (type === 'alarm') {
    icon = <AlarmIcon size={16} color={c} />;
  } else if (type === 'arrow') {
    icon = (
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        <Polyline points="12 5 19 12 12 19" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  } else if (type === 'phone') {
    icon = <PhoneIcon size={16} color={c} />;
  } else {
    icon = (
      <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
        <Line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    );
  }
  return (
    <View style={[styles.timelineIconWrap, { backgroundColor: bg }]}>{icon}</View>
  );
}

export default function LeadDetailsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 12, paddingBottom: 24 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <View style={{ alignItems: 'center', flex: 1 }}>
            <Text style={styles.headerName}>Aarav Mehta</Text>
            <View style={styles.stagePill}>
              <Text style={styles.stagePillText}>Site Visit Done</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <DotsIcon />
          </TouchableOpacity>
        </View>

        {/* ── Action Buttons ── */}
        <View style={styles.actionRow}>
          {[
            { label: 'Call', icon: <PhoneIcon size={22} color={colors.textInverse} />, active: true },
            { label: 'Chat', icon: <ChatIcon size={22} color={colors.textPrimary} />, active: false },
            { label: 'Mail', icon: <MailIcon size={22} color={colors.textPrimary} />, active: false },
            { label: 'Visit', icon: <CalendarIcon size={22} color={colors.textPrimary} />, active: false },
          ].map((btn) => (
            <TouchableOpacity
              key={btn.label}
              style={[styles.actionBtn, btn.active && styles.actionBtnActive]}
              activeOpacity={0.75}
            >
              {btn.icon}
              <Text style={[styles.actionBtnLabel, btn.active && styles.actionBtnLabelActive]}>
                {btn.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Follow-up Banner ── */}
        <View style={styles.followupBanner}>
          <View style={styles.followupLeft}>
            <AlarmIcon size={18} color={colors.textInverse} />
            <View>
              <Text style={styles.followupTitle}>Follow-up today at 4:30 PM</Text>
              <Text style={styles.followupSub}>Site visit recap call · Don't miss</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.snoozeBtn}>
            <Text style={styles.snoozeBtnText}>Snooze</Text>
          </TouchableOpacity>
        </View>

        {/* ── Lead Information ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Lead information</Text>
          <View style={styles.infoGrid}>
            {[
              { label: 'Phone', value: '+91 98200 12345' },
              { label: 'Email', value: 'aarav.m@gmail.com' },
              { label: 'Source', value: 'WhatsApp · Assigned to Priya' },
              { label: 'Created', value: '12 Oct 2026 · Budget ₹80–90L' },
            ].map((row) => (
              <View key={row.label} style={styles.infoRow}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text style={styles.infoValue}>{row.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.nicheGrid}>
            {[
              { label: 'Preferred Area', value: 'Gachibowli' },
              { label: 'Property Type', value: '2BHK Apartment' },
              { label: 'Site Visit', value: '13 Oct · 11 AM' },
              { label: 'Budget', value: '₹85L' },
            ].map((f) => (
              <View key={f.label} style={styles.nicheField}>
                <Text style={styles.nicheFieldLabel}>{f.label}</Text>
                <Text style={styles.nicheFieldValue}>{f.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Activity Timeline ── */}
        <Text style={styles.sectionTitle}>Activity timeline</Text>
        <View style={styles.timeline}>
          {TIMELINE.map((item, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <TimelineIcon type={item.icon} />
                {i < TIMELINE.length - 1 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>{item.title}</Text>
                <Text style={styles.timelineDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* ── Bottom Actions ── */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TouchableOpacity style={styles.changeStageBtnDark} activeOpacity={0.85}>
          <Text style={styles.changeStageBtnDarkText}>Change Stage</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addNoteBtn} activeOpacity={0.85}>
          <Text style={styles.addNoteBtnText}>Add Note</Text>
        </TouchableOpacity>
      </View>

      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 16,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerName: { fontFamily: 'Manrope_700Bold', fontSize: 17, color: colors.textPrimary },
  stagePill: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginTop: 3,
  },
  stagePillText: { ...textStyles.caption, color: colors.textSecondary, fontFamily: 'Manrope_500Medium', fontSize: 11 },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: radius.card,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  actionBtnLabel: { ...textStyles.caption, color: colors.textPrimary, fontFamily: 'Manrope_500Medium', fontSize: 12 },
  actionBtnLabelActive: { color: colors.textInverse },
  followupBanner: {
    backgroundColor: colors.accent,
    borderRadius: radius.card,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  followupLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, flex: 1 },
  followupTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textInverse },
  followupSub: { ...textStyles.caption, color: 'rgba(255,254,250,0.7)', fontSize: 12, marginTop: 1 },
  snoozeBtn: {
    backgroundColor: colors.textInverse,
    borderRadius: radius.button,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  snoozeBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: colors.accent },
  infoCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  cardTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, color: colors.textPrimary },
  infoGrid: { gap: 8 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  infoLabel: { ...textStyles.caption, color: colors.textSecondary, flex: 0.4 },
  infoValue: { ...textStyles.caption, color: colors.textPrimary, fontFamily: 'Manrope_600SemiBold', flex: 0.58, textAlign: 'right', fontSize: 13 },
  nicheGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  nicheField: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    padding: 10,
    gap: 2,
  },
  nicheFieldLabel: { ...textStyles.caption, color: colors.textSecondary, fontSize: 11 },
  nicheFieldValue: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
  sectionTitle: { fontFamily: 'Manrope_700Bold', fontSize: 18, color: colors.textPrimary },
  timeline: { gap: 0 },
  timelineItem: { flexDirection: 'row', gap: 12 },
  timelineLeft: { alignItems: 'center', width: 32 },
  timelineIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timelineLine: { width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 4, minHeight: 24 },
  timelineContent: { flex: 1, paddingBottom: 20 },
  timelineTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
  timelineDesc: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: layout.screenPaddingH,
    paddingTop: 12,
    backgroundColor: colors.bgSurface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  changeStageBtnDark: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingVertical: 14,
    alignItems: 'center',
  },
  changeStageBtnDarkText: { ...textStyles.button, color: colors.textInverse },
  addNoteBtn: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.button,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  addNoteBtnText: { ...textStyles.button, color: colors.textPrimary },
});

