// ─────────────────────────────────────────────────────────────
//  Universal CRM — Brand Header
//  Compact UnivCRM wordmark used across all auth/onboarding screens
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, BRAND } from '../../theme';

interface BrandHeaderProps {
  showTagline?: boolean;
}

export function BrandHeader({ showTagline = true }: BrandHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.logoMark}>
        <Text style={styles.logoLetter}>U</Text>
      </View>
      <View style={styles.textGroup}>
        <Text style={styles.wordmark}>{BRAND.name}</Text>
        {showTagline && <Text style={styles.tagline}>{BRAND.tagline}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    ...textStyles.wordmark,
    color: colors.textInverse,
    fontSize: 16,
  },
  textGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing[1],
  },
  wordmark: {
    ...textStyles.wordmark,
    color: colors.textPrimary,
  },
  tagline: {
    ...textStyles.overline,
    color: colors.textSecondary,
    fontSize: 9,
  },
});
