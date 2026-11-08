// ─────────────────────────────────────────────────────────────
//  Universal CRM — Contact Details Screen (Screen 12)
//  Dark header, action buttons, info card, notes, related leads
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
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

function ArrowLeftIcon({ color = '#fff', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PencilIcon({ color = '#fff', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PhoneIcon({ size = 22, color = '#252A26' }: { size?: number; color?: string }) {
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

export default function ContactDetailsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Dark Header ── */}
        <View style={[styles.darkHeader, { paddingTop: insets.top + 12 }]}>
          <View style={styles.darkTopBar}>
            <TouchableOpacity
              style={styles.iconBtnLight}
              onPress={() => router.back()}
            >
              <ArrowLeftIcon color={colors.textInverse} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtnLight}>
              <PencilIcon color={colors.textInverse} />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={[styles.bigAvatar, { backgroundColor: colors.accent }]}>
            <Text style={styles.bigAvatarText}>DS</Text>
          </View>

          <Text style={styles.contactName}>Diya Sharma</Text>
          <Text style={styles.contactSub}>Buyer · Madhapur, Hyderabad</Text>

          {/* Action Buttons */}
          <View style={styles.actionRow}>
            {[
              { icon: <PhoneIcon size={22} color={colors.textPrimary} />, label: 'Call' },
              { icon: <ChatIcon size={22} color={colors.textPrimary} />, label: 'Chat' },
              { icon: <MailIcon size={22} color={colors.textPrimary} />, label: 'Mail' },
            ].map((btn) => (
              <TouchableOpacity key={btn.label} style={styles.actionBtn} activeOpacity={0.75}>
                {btn.icon}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ── Body ── */}
        <View style={styles.body}>
          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoGrid}>
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Phone</Text>
                <Text style={styles.infoValue}>+91 99870 44556</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>diya.s@gmail.com</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Company</Text>
                <Text style={styles.infoValue}>—</Text>
              </View>
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Birthday</Text>
                <Text style={styles.infoValue}>4 Mar</Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          <View style={styles.notesCard}>
            <Text style={styles.notesTitle}>NOTES</Text>
            <Text style={styles.notesText}>
              Prefers high-floor, east-facing units. Loan pre-approved for ₹95L. Husband joins site visits on weekends.
            </Text>
          </View>

          {/* Related Leads */}
          <View style={styles.relatedCard}>
            <View style={styles.relatedHeader}>
              <Text style={styles.relatedTitle}>RELATED LEADS</Text>
              <TouchableOpacity>
                <Text style={styles.viewLink}>View</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.leadItem}
              activeOpacity={0.75}
              onPress={() => router.push('/(crm)/lead-details' as any)}
            >
              <View style={[styles.miniAvatar, { backgroundColor: '#B8C5B2' }]}>
                <Text style={styles.miniAvatarText}>DS</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.leadName}>3BHK, Madhapur</Text>
                <Text style={styles.leadSub}>Offer stage · ₹92L</Text>
              </View>
              <View style={styles.hotBadge}>
                <Text style={styles.hotBadgeText}>Hot</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  darkHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: layout.screenPaddingH,
    paddingBottom: 28,
    alignItems: 'center',
    gap: 8,
  },
  darkTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    marginBottom: 12,
  },
  iconBtnLight: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,254,250,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bigAvatarText: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: colors.textInverse },
  contactName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 24, color: colors.textInverse, marginTop: 4 },
  contactSub: { ...textStyles.body, color: 'rgba(255,254,250,0.6)', fontSize: 14 },
  actionRow: { flexDirection: 'row', gap: 16, marginTop: 8 },
  actionBtn: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.textInverse,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: layout.screenPaddingH,
    paddingTop: 16,
    gap: 12,
  },
  infoCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
  infoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  infoCell: { flex: 1, minWidth: '45%' },
  infoLabel: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  infoValue: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary, marginTop: 2 },
  notesCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
  },
  notesTitle: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1 },
  notesText: { ...textStyles.body, color: colors.textPrimary, lineHeight: 22 },
  relatedCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  relatedHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  relatedTitle: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1 },
  viewLink: { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: colors.primary },
  leadItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  miniAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniAvatarText: { fontFamily: 'Manrope_700Bold', fontSize: 12, color: colors.textInverse },
  leadName: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
  leadSub: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  hotBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.accentSecondary,
  },
  hotBadgeText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: colors.accentSecondary },
});

