// ─────────────────────────────────────────────────────────────
//  Universal CRM — Add / Edit Lead (Screen 10)
//  Sections: Basic Info, Lead Info, Property Details (Real Estate)
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line } from 'react-native-svg';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';

function CloseIcon({ color = '#252A26', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function ChevronDownIcon({ color = '#77786F', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="6 9 12 15 18 9" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LocationIcon({ color = '#77786F', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth={1.75} />
    </Svg>
  );
}

function CalendarIcon({ color = '#77786F', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

const TAGS = ['Hot', 'Site visit', '+ Tag'];

interface SelectProps {
  label: string;
  value: string;
}

function SelectField({ label, value }: SelectProps) {
  return (
    <View style={styles.selectField}>
      <Text style={styles.selectValue}>{value}</Text>
      <ChevronDownIcon />
    </View>
  );
}

export default function AddLeadScreen() {
  const insets = useSafeAreaInsets();
  const [selectedTags, setSelectedTags] = useState(['Hot', 'Site visit']);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 12, paddingBottom: 100 },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
              <CloseIcon />
            </TouchableOpacity>
            <View>
              <Text style={styles.pageTitle}>Add new lead</Text>
              <Text style={styles.pageSubtitle}>Real Estate workspace</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        {/* ── A: Basic Information ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLetter}>A · BASIC INFORMATION</Text>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Neha Kulkarni"
              placeholderTextColor={colors.textPrimary}
              defaultValue="Neha Kulkarni"
            />
          </View>
          <View style={styles.fieldRow}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Phone</Text>
              <TextInput
                style={styles.textInput}
                placeholder="+91 98..."
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                placeholder="neha@..."
                placeholderTextColor={colors.textSecondary}
                keyboardType="email-address"
              />
            </View>
          </View>
        </View>

        {/* ── B: Lead Information ── */}
        <View style={styles.section}>
          <Text style={styles.sectionLetter}>B · LEAD INFORMATION</Text>
          <View style={styles.fieldRow}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Source</Text>
              <SelectField label="Source" value="WhatsApp" />
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Stage</Text>
              <SelectField label="Stage" value="Inquiry" />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Assign To</Text>
            <SelectField label="Assign To" value="Priya Nair" />
          </View>
          {/* Tags */}
          <View style={styles.tagsRow}>
            {TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              const isAdd = tag === '+ Tag';
              return (
                <TouchableOpacity
                  key={tag}
                  style={[
                    styles.tag,
                    isSelected && !isAdd && styles.tagSelected,
                    isAdd && styles.tagAdd,
                  ]}
                  onPress={() => {
                    if (!isAdd) {
                      setSelectedTags((prev) =>
                        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
                      );
                    }
                  }}
                  activeOpacity={0.75}
                >
                  <Text style={[styles.tagText, isSelected && !isAdd && styles.tagTextSelected]}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ── C: Property Details (Real Estate niche) ── */}
        <View style={[styles.section, styles.sectionHighlighted]}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionLetter}>C · PROPERTY DETAILS</Text>
            <Text style={styles.nicheLabel}>Real Estate</Text>
          </View>
          <View style={styles.fieldRow}>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Budget</Text>
              <TextInput
                style={styles.textInput}
                placeholder="₹80–90L"
                placeholderTextColor={colors.textPrimary}
                defaultValue="₹80–90L"
              />
            </View>
            <View style={[styles.fieldGroup, { flex: 1 }]}>
              <Text style={styles.fieldLabel}>Property Type</Text>
              <SelectField label="Property Type" value="2BHK" />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Preferred Area</Text>
            <View style={styles.textInputWithIcon}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="Gachibowli, Hyderabad"
                placeholderTextColor={colors.textPrimary}
                defaultValue="Gachibowli, Hyderabad"
              />
              <LocationIcon />
            </View>
          </View>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>Site Visit Date</Text>
            <View style={styles.textInputWithIcon}>
              <TextInput
                style={[styles.textInput, { flex: 1 }]}
                placeholder="15 Oct 2026 · 11:00 AM"
                placeholderTextColor={colors.textPrimary}
                defaultValue="15 Oct 2026 · 11:00 AM"
              />
              <CalendarIcon />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Save Button ── */}
      <View style={[styles.saveBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity
          style={styles.saveBtn}
          activeOpacity={0.85}
          onPress={() => router.back()}
        >
          <Text style={styles.saveBtnText}>Save Lead</Text>
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
  topLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: { fontFamily: 'Manrope_700Bold', fontSize: 17, color: colors.textPrimary },
  pageSubtitle: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  cancelText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.accent },
  section: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 12,
  },
  sectionHighlighted: {
    borderColor: colors.primary,
    borderWidth: 1.5,
  },
  sectionLetter: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nicheLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: colors.accent },
  fieldGroup: { gap: 6 },
  fieldRow: { flexDirection: 'row', gap: 10 },
  fieldLabel: { ...textStyles.caption, color: colors.textPrimary, fontFamily: 'Manrope_600SemiBold', fontSize: 13 },
  textInput: {
    backgroundColor: colors.bg,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    ...textStyles.body,
    color: colors.textPrimary,
    fontSize: 14,
  },
  textInputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bg,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  selectField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.bg,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  selectValue: { ...textStyles.body, color: colors.textPrimary, fontSize: 14 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.chip,
    borderWidth: 1.5,
    borderColor: colors.border,
    backgroundColor: colors.bgSurface,
  },
  tagSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  tagAdd: { backgroundColor: 'transparent', borderStyle: 'dashed' },
  tagText: { fontFamily: 'Manrope_500Medium', fontSize: 13, color: colors.textSecondary },
  tagTextSelected: { color: colors.textInverse, fontFamily: 'Manrope_600SemiBold' },
  saveBar: {
    paddingHorizontal: layout.screenPaddingH,
    paddingTop: 12,
    backgroundColor: colors.bgSurface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: { ...textStyles.button, color: colors.textInverse, fontSize: 16 },
});

