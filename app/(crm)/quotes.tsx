// ─────────────────────────────────────────────────────────────
//  Universal CRM — Quotes & Invoices Screen (Screen 14)
//  Receivable/Received hero, filter tabs, document list
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
import Svg, { Line, Polyline } from 'react-native-svg';
import { colors, textStyles, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

const FILTER_TABS = ['All', 'Draft', 'Sent', 'Paid'];

const DOCUMENTS = [
  {
    id: '1',
    ref: 'QT-2041',
    client: 'Diya Sharma',
    desc: 'Token advance · 3BHK Madhapur',
    amount: '₹1,00,000',
    status: 'Sent',
    statusFilter: 'Sent',
  },
  {
    id: '2',
    ref: 'INV-1893',
    client: 'Rohan Iyer',
    desc: 'Brokerage invoice · Villa',
    amount: '₹1,60,000',
    status: 'Paid',
    statusFilter: 'Paid',
  },
  {
    id: '3',
    ref: 'QT-2040',
    client: 'Sana Sheikh',
    desc: 'Booking quote · Adibatla Villa',
    amount: '₹1,40,000',
    status: 'Draft',
    statusFilter: 'Draft',
  },
];

const STATUS_STYLES: Record<string, { bg: string; text: string }> = {
  Sent: { bg: colors.bgMuted, text: colors.textSecondary },
  Paid: { bg: colors.bgMuted, text: colors.textSecondary },
  Draft: { bg: colors.bgSurface, text: colors.textSecondary },
};

function PlusIcon({ color = '#fff', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
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

export default function QuotesScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('Sent');

  const filtered = DOCUMENTS.filter(
    (d) => activeFilter === 'All' || d.statusFilter === activeFilter
  );

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
            <Text style={styles.title}>Quotes & Invoices</Text>
            <Text style={styles.subtitle}>₹4.8L receivable this month</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <PlusIcon />
            <Text style={styles.addBtnText}>New</Text>
          </TouchableOpacity>
        </View>

        {/* ── Hero Stats ── */}
        <View style={styles.heroRow}>
          <View style={[styles.heroCard, styles.heroCardDark]}>
            <Text style={styles.heroLabelDark}>RECEIVABLE</Text>
            <Text style={styles.heroAmountDark}>₹4.8L</Text>
          </View>
          <View style={[styles.heroCard, styles.heroCardLight]}>
            <Text style={styles.heroLabelLight}>RECEIVED</Text>
            <Text style={styles.heroAmountLight}>₹9.2L</Text>
          </View>
        </View>

        {/* ── Filter Tabs ── */}
        <View style={styles.filterRow}>
          {FILTER_TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.filterTab, activeFilter === tab && styles.filterTabActive]}
              onPress={() => setActiveFilter(tab)}
              activeOpacity={0.75}
            >
              <Text style={[styles.filterTabText, activeFilter === tab && styles.filterTabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Document List ── */}
        {filtered.map((doc) => {
          const ss = STATUS_STYLES[doc.status] ?? STATUS_STYLES.Draft;
          return (
            <TouchableOpacity
              key={doc.id}
              style={styles.docCard}
              activeOpacity={0.75}
              onPress={() => router.push('/(crm)/document-preview' as any)}
            >
              <View style={styles.docTopRow}>
                <Text style={styles.docRef}>{doc.ref} · {doc.client}</Text>
                <View style={[styles.statusBadge, { backgroundColor: ss.bg }]}>
                  <Text style={[styles.statusText, { color: ss.text }]}>{doc.status}</Text>
                </View>
              </View>
              <Text style={styles.docDesc}>{doc.desc}</Text>
              <View style={styles.docBottomRow}>
                <Text style={styles.docAmount}>{doc.amount}</Text>
                <TouchableOpacity
                  style={styles.previewBtn}
                  onPress={() => router.push('/(crm)/document-preview' as any)}
                  activeOpacity={0.75}
                >
                  <Text style={styles.previewBtnText}>Preview</Text>
                  <ArrowRightIcon color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}

        {filtered.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No {activeFilter.toLowerCase()} documents</Text>
          </View>
        )}
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingHorizontal: 16,
    paddingVertical: 11,
  },
  addBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.textInverse },
  heroRow: { flexDirection: 'row', gap: 10 },
  heroCard: {
    flex: 1,
    borderRadius: radius.card,
    padding: 16,
    gap: 8,
  },
  heroCardDark: { backgroundColor: colors.primary },
  heroCardLight: {
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroLabelDark: { ...textStyles.overline, color: 'rgba(255,254,250,0.5)', letterSpacing: 1 },
  heroLabelLight: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1 },
  heroAmountDark: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: colors.textInverse },
  heroAmountLight: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: colors.textPrimary },
  filterRow: { flexDirection: 'row', gap: 8 },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.chip,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgSurface,
  },
  filterTabActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterTabText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: colors.textSecondary },
  filterTabTextActive: { color: colors.textInverse, fontFamily: 'Manrope_600SemiBold' },
  docCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 8,
    marginTop: -4,
  },
  docTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  docRef: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.chip,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statusText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12 },
  docDesc: { ...textStyles.caption, color: colors.textSecondary, fontSize: 13 },
  docBottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  docAmount: { fontFamily: 'Manrope_800ExtraBold', fontSize: 20, color: colors.textPrimary },
  previewBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  previewBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.textPrimary },
  emptyState: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 32,
    alignItems: 'center',
  },
  emptyText: { ...textStyles.body, color: colors.textSecondary },
});

