// ─────────────────────────────────────────────────────────────
//  Universal CRM — Leads Screen (Screen 7)
//  Search, filter tabs, sortable lead list
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line } from 'react-native-svg';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

// ─── Mock Data ────────────────────────────────────────────────
const LEADS = [
  {
    id: '1',
    initials: 'AM',
    name: 'Aarav Mehta',
    amount: '₹85L',
    phone: '+91 98200 12345',
    detail: '2BHK, Gachibowli',
    stage: 'Site Visit Done',
    stageFilter: 'In Progress',
    source: 'WhatsApp',
    followup: 'Today, 4:30 PM',
    followupColor: colors.accent,
    avatarBg: '#B8C5B2',
  },
  {
    id: '2',
    initials: 'DS',
    name: 'Diya Sharma',
    amount: '₹92L',
    phone: '+91 99870 44556',
    detail: '3BHK, Madhapur',
    stage: 'Offer',
    stageFilter: 'In Progress',
    source: 'WhatsApp',
    followup: 'Today, 6 PM',
    followupColor: colors.accent,
    avatarBg: colors.accent,
  },
  {
    id: '3',
    initials: 'RI',
    name: 'Rohan Iyer',
    amount: '₹1.6 Cr',
    phone: '+91 98111 22334',
    detail: 'Villa, Kondapur',
    stage: 'Negotiation',
    stageFilter: 'In Progress',
    source: 'Manual',
    followup: 'Tomorrow',
    followupColor: colors.textSecondary,
    avatarBg: '#B8C5B2',
  },
  {
    id: '4',
    initials: 'FK',
    name: 'Fatima Khan',
    amount: '₹48L',
    phone: '+91 97654 33221',
    detail: 'Plot, Shadnagar',
    stage: 'Inquiry',
    stageFilter: 'New',
    source: 'Manual',
    followup: '',
    followupColor: colors.textSecondary,
    avatarBg: '#B8C5B2',
  },
];

const FILTER_TABS = ['All', 'New', 'In Progress', 'Due', 'Won'];

function SearchIcon({ color = '#77786F' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={1.75} />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function FilterIcon({ color = '#252A26' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Line x1="4" y1="6" x2="20" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="11" y1="18" x2="13" y2="18" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function SortIcon({ color = '#77786F' }: { color?: string }) {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="m3 16 4 4 4-4" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 20V4" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m21 8-4-4-4 4" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 4v16" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PersonIcon({ size = 12, color = '#77786F' }: { size?: number; color?: string }) {
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

export default function LeadsScreen() {
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchText, setSearchText] = useState('');

  const filtered = LEADS.filter((l) => {
    const matchesSearch =
      !searchText ||
      l.name.toLowerCase().includes(searchText.toLowerCase()) ||
      l.phone.includes(searchText);
    const matchesFilter =
      activeFilter === 'All' || l.stageFilter === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: 16 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Leads</Text>
            <Text style={styles.subtitle}>128 total · 14 new this week</Text>
          </View>
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => router.push('/(crm)/add-lead' as any)}
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* ── Search ── */}
        <View style={styles.searchBar}>
          <SearchIcon color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search name or phone..."
            placeholderTextColor={colors.textSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity>
            <FilterIcon color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {/* ── Filter Tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
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
        </ScrollView>

        {/* ── Sort Row ── */}
        <View style={styles.sortRow}>
          <View style={styles.sortLeft}>
            <SortIcon />
            <Text style={styles.sortText}>Newest first</Text>
          </View>
          <Text style={styles.filterStatus}>Filter: All stages</Text>
        </View>

        {/* ── Lead List ── */}
        {filtered.map((lead) => (
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
                <Text style={styles.leadAmount}>{lead.amount}</Text>
              </View>
              <Text style={styles.leadSub}>{lead.phone} · {lead.detail}</Text>
              <View style={styles.leadMeta}>
                <View style={styles.stagePill}>
                  <Text style={styles.stagePillText}>{lead.stage}</Text>
                </View>
                <View style={styles.metaItem}>
                  <PersonIcon />
                  <Text style={styles.metaText}>{lead.source}</Text>
                </View>
                {lead.followup ? (
                  <View style={styles.metaItem}>
                    <ClockIcon color={lead.followupColor} />
                    <Text style={[styles.metaText, { color: lead.followupColor }]}>
                      {lead.followup}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* ── No Results ── */}
        {filtered.length === 0 && searchText.length > 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No results for "{searchText}"</Text>
            <Text style={styles.emptyBody}>Try a different name, phone or stage.</Text>
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
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  addBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  addBtnText: { ...textStyles.button, color: colors.textInverse, fontSize: 14 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    ...textStyles.body,
    color: colors.textPrimary,
    padding: 0,
  },
  filterRow: { gap: 8, paddingRight: 4 },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radius.chip,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgSurface,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterTabText: { ...textStyles.bodyMedium, color: colors.textSecondary, fontSize: 13 },
  filterTabTextActive: { color: colors.textInverse, fontFamily: 'Manrope_600SemiBold' },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  sortLeft: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  sortText: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  filterStatus: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
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
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textInverse },
  leadTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  leadName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  leadAmount: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
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
  emptyState: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderStyle: 'dashed',
    padding: 28,
    alignItems: 'center',
    gap: 6,
    marginTop: -4,
  },
  emptyTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  emptyBody: { ...textStyles.caption, color: colors.textSecondary, textAlign: 'center' },
});

