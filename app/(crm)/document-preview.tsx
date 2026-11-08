// ─────────────────────────────────────────────────────────────
//  Universal CRM — Document Preview Screen (Screen 15)
//  Quotation preview card, WhatsApp + Download PDF actions
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

function ArrowLeftIcon({ color = '#252A26', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShareIcon({ color = '#252A26', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="18" cy="5" r="3" stroke={color} strokeWidth={1.75} />
      <Circle cx="6" cy="12" r="3" stroke={color} strokeWidth={1.75} />
      <Circle cx="18" cy="19" r="3" stroke={color} strokeWidth={1.75} />
      <Line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function DownloadIcon({ color = '#fff', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="7 10 12 15 17 10" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function ChatIcon({ color = '#fff', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const LINE_ITEMS = [
  { desc: 'Token Advance — 3BHK, Madhapur', amount: '₹1,00,000' },
  { desc: 'Registration assistance', amount: '₹15,000' },
  { desc: 'Interior consultation (optional)', amount: '₹25,000' },
];

export default function DocumentPreviewScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 12, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.iconBtn} onPress={() => router.back()}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.docRef}>QT-2041</Text>
            <Text style={styles.docMeta}>Quotation · Diya Sharma</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <ShareIcon />
          </TouchableOpacity>
        </View>

        {/* ── Document Card ── */}
        <View style={styles.docCard}>
          {/* Business header */}
          <View style={styles.docHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.businessName}>UrbanNest Realty</Text>
              <Text style={styles.businessSub}>
                Jubilee Hills, Hyderabad · GSTIN 36AABCU1234F1Z5
              </Text>
            </View>
            <View style={styles.sentBadge}>
              <Text style={styles.sentBadgeText}>SENT</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Billed to / Valid till */}
          <View style={styles.billingRow}>
            <View>
              <Text style={styles.billingLabel}>Billed to</Text>
              <Text style={styles.billingValue}>Diya Sharma</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.billingLabel}>Valid till</Text>
              <Text style={styles.billingValue}>28 Oct 2026</Text>
            </View>
          </View>

          {/* Line items */}
          <View style={styles.lineItems}>
            {LINE_ITEMS.map((item, i) => (
              <View key={i} style={styles.lineItem}>
                <Text style={styles.lineItemDesc}>{item.desc}</Text>
                <Text style={styles.lineItemAmount}>{item.amount}</Text>
              </View>
            ))}
          </View>

          <View style={styles.divider} />

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹1,40,000</Text>
          </View>

          {/* Payment note */}
          <View style={styles.paymentNote}>
            <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
              <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={colors.textSecondary} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
              <Polyline points="14 2 14 8 20 8" stroke={colors.textSecondary} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.paymentNoteText}>
              Includes payment schedule · 10% token, 80% on registration, 10% on handover.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Bottom Actions ── */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={[styles.actionBtn, styles.whatsappBtn]} activeOpacity={0.85}>
          <ChatIcon size={18} color={colors.textInverse} />
          <Text style={styles.actionBtnText}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.downloadBtn]} activeOpacity={0.85}>
          <DownloadIcon size={18} color={colors.textInverse} />
          <Text style={styles.actionBtnText}>Download PDF</Text>
        </TouchableOpacity>
      </View>
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
  docRef: { fontFamily: 'Manrope_700Bold', fontSize: 17, color: colors.textPrimary },
  docMeta: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12, marginTop: 1 },
  docCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    gap: 16,
  },
  docHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  businessName: { fontFamily: 'Manrope_800ExtraBold', fontSize: 18, color: colors.textPrimary },
  businessSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 4, lineHeight: 18 },
  sentBadge: {
    backgroundColor: colors.accentSecondary,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  sentBadgeText: { fontFamily: 'Manrope_700Bold', fontSize: 11, color: '#5A3800', letterSpacing: 0.5 },
  divider: { height: 1, backgroundColor: colors.border },
  billingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  billingLabel: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  billingValue: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary, marginTop: 2 },
  lineItems: { gap: 12 },
  lineItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 },
  lineItemDesc: { ...textStyles.body, color: colors.textPrimary, flex: 1, lineHeight: 20 },
  lineItemAmount: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.textPrimary },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: colors.textPrimary },
  totalAmount: { fontFamily: 'Manrope_800ExtraBold', fontSize: 26, color: colors.textPrimary },
  paymentNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.bgMuted,
    borderRadius: radius.md,
    padding: 12,
  },
  paymentNoteText: { ...textStyles.caption, color: colors.textSecondary, flex: 1, lineHeight: 18 },
  bottomBar: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: layout.screenPaddingH,
    paddingTop: 12,
    backgroundColor: colors.bgSurface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius.button,
    paddingVertical: 15,
  },
  whatsappBtn: { backgroundColor: colors.primaryLight },
  downloadBtn: { backgroundColor: colors.primary },
  actionBtnText: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textInverse },
});

