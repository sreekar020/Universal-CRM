// ─────────────────────────────────────────────────────────────
//  Universal CRM — Contacts Screen (Screen 11)
//  Alphabetically grouped contact list with phone shortcut
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SectionList,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

const CONTACTS_DATA = [
  {
    section: 'A',
    data: [
      { id: '1', initials: 'AM', name: 'Aarav Mehta', role: 'Buyer', detail: 'Site Visit Done', avatarBg: '#B8C5B2' },
      { id: '2', initials: 'AR', name: 'Ananya Rao', role: 'Seller', detail: 'Kondapur Villa', avatarBg: '#B8C5B2' },
    ],
  },
  {
    section: 'D',
    data: [
      { id: '3', initials: 'DS', name: 'Diya Sharma', role: 'Buyer', detail: 'Offer Stage', avatarBg: colors.accent },
      { id: '4', initials: 'DV', name: 'Deepak Verma', role: 'Channel Partner', detail: '', avatarBg: '#B8C5B2' },
    ],
  },
];

function SearchIcon({ color = '#77786F' }: { color?: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="8" stroke={color} strokeWidth={1.75} />
      <Line x1="21" y1="21" x2="16.65" y2="16.65" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function PhoneIcon({ size = 20, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 17" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PlusIcon({ color = '#fff', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function ContactsScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Header (outside SectionList for sticky effect) */}
      <View style={[styles.headerWrap, { paddingTop: insets.top + 16 }]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Contacts</Text>
            <Text style={styles.subtitle}>86 people · 4 companies</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <PlusIcon />
          </TouchableOpacity>
        </View>
        {/* Search */}
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <SectionList
        sections={CONTACTS_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.list, { paddingBottom: 16 }]}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { section } }) => (
          <Text style={styles.sectionHeader}>{section}</Text>
        )}
        renderSectionFooter={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index, section }) => {
          const isFirst = index === 0;
          const isLast = index === section.data.length - 1;
          return (
            <TouchableOpacity
              style={[
                styles.contactItem,
                isFirst && styles.contactItemFirst,
                isLast && styles.contactItemLast,
                !isLast && styles.contactItemBorder,
              ]}
              activeOpacity={0.75}
              onPress={() => router.push('/(crm)/contact-details' as any)}
            >
              <View style={[styles.avatar, { backgroundColor: item.avatarBg }]}>
                <Text style={styles.avatarText}>{item.initials}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.contactName}>{item.name}</Text>
                <Text style={styles.contactSub}>
                  {item.role}{item.detail ? ` · ${item.detail}` : ''}
                </Text>
              </View>
              <TouchableOpacity style={styles.phoneBtn} activeOpacity={0.7}>
                <PhoneIcon size={18} color={colors.textPrimary} />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  headerWrap: {
    paddingHorizontal: layout.screenPaddingH,
    paddingBottom: 12,
    gap: 14,
    backgroundColor: colors.bg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  list: {
    paddingHorizontal: layout.screenPaddingH,
  },
  sectionHeader: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
    marginTop: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgSurface,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
  },
  contactItemFirst: {
    borderTopWidth: 1,
    borderTopLeftRadius: radius.card,
    borderTopRightRadius: radius.card,
  },
  contactItemLast: {
    borderBottomWidth: 1,
    borderBottomLeftRadius: radius.card,
    borderBottomRightRadius: radius.card,
  },
  contactItemBorder: {
    borderBottomWidth: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textInverse },
  contactName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  contactSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 1 },
  phoneBtn: { padding: 4 },
});

