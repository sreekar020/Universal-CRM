// ─────────────────────────────────────────────────────────────
//  Universal CRM — Team Management Screen (Screen 16)
//  Invite banner, member list, roles & access section
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
import Svg, { Path, Circle, Polyline, Line } from 'react-native-svg';
import { colors, textStyles, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

const MEMBERS = [
  { id: '1', initials: 'PN', name: 'Priya Nair', role: 'Closer', stats: '32 leads · ₹62L closed', avatarBg: colors.accent, pending: false },
  { id: '2', initials: 'AR', name: 'Arjun Rao', role: 'Caller', stats: '41 leads · 18 visits', avatarBg: '#B8C5B2', pending: false },
  { id: '3', initials: 'SK', name: 'Sneha Kulkarni', role: 'Coordinator', stats: 'Docs & visits', avatarBg: '#B8C5B2', pending: false },
  { id: '4', initials: 'VD', name: 'Vikram Das', role: 'Pending invite', stats: 'sent 2h ago', avatarBg: '#B8C5B2', pending: true },
];

const ROLES = [
  { role: 'Owner', desc: 'Everything · Sreekar' },
  { role: 'Closer', desc: 'Leads, pipeline, quotes' },
  { role: 'Caller', desc: 'Leads & follow-ups only' },
];

function PlusIcon({ color = '#fff', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
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

function ArrowRightIcon({ color = '#fff', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 5 19 12 12 19" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function TeamScreen() {
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
          <View>
            <Text style={styles.title}>Team</Text>
            <Text style={styles.subtitle}>5 members · 3 roles</Text>
          </View>
          <TouchableOpacity style={styles.inviteBtn} activeOpacity={0.85}>
            <PlusIcon />
            <Text style={styles.inviteBtnText}>Invite</Text>
          </TouchableOpacity>
        </View>

        {/* ── WhatsApp Invite Banner ── */}
        <TouchableOpacity style={styles.whatsappBanner} activeOpacity={0.85}>
          <View style={styles.whatsappIconWrap}>
            <PlusIcon color={colors.textInverse} size={18} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.whatsappTitle}>Invite by WhatsApp</Text>
            <Text style={styles.whatsappSubtitle}>Teammates join in under a minute</Text>
          </View>
          <ArrowRightIcon color={colors.textInverse} size={18} />
        </TouchableOpacity>

        {/* ── Member List ── */}
        {MEMBERS.map((member, index) => (
          <TouchableOpacity
            key={member.id}
            style={styles.memberCard}
            activeOpacity={0.75}
          >
            <View style={[styles.avatar, { backgroundColor: member.avatarBg }]}>
              <Text style={styles.avatarText}>{member.initials}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberStats}>
                {member.role} · {member.stats}
              </Text>
            </View>
            {member.pending ? (
              <TouchableOpacity style={styles.resendBtn} activeOpacity={0.75}>
                <Text style={styles.resendBtnText}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <ChevronRightIcon color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        ))}

        {/* ── Roles & Access ── */}
        <View style={styles.rolesCard}>
          <Text style={styles.rolesTitle}>ROLES & ACCESS</Text>
          {ROLES.map((r, i) => (
            <View key={r.role} style={[styles.roleRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10, marginTop: 10 }]}>
              <Text style={styles.roleName}>{r.role}</Text>
              <Text style={styles.roleDesc}>{r.desc}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  inviteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  inviteBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.textInverse },
  whatsappBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.primary,
    borderRadius: radius.card,
    padding: 16,
  },
  whatsappIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textInverse },
  whatsappSubtitle: { ...textStyles.caption, color: 'rgba(255,254,250,0.6)', marginTop: 2 },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
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
  memberName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  memberStats: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  resendBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.accentSecondary,
  },
  resendBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: colors.accentSecondary },
  rolesCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 0,
    marginTop: 4,
  },
  rolesTitle: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1, marginBottom: 12 },
  roleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  roleName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  roleDesc: { ...textStyles.caption, color: colors.textSecondary, fontSize: 13 },
});

