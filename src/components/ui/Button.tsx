// ─────────────────────────────────────────────────────────────
//  Universal CRM — Button Components
// ─────────────────────────────────────────────────────────────

import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { colors, textStyles, layout, radius, spacing } from '../../theme';

// ── Primary Button ─────────────────────────────────────────────

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  style?: ViewStyle;
}

export function PrimaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  leftIcon,
  style,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.82}
      style={[styles.primaryBtn, isDisabled && styles.primaryBtnDisabled, style]}
    >
      {loading ? (
        <View style={styles.btnContent}>
          <ActivityIndicator size="small" color={colors.btnPrimaryText} />
          <Text style={styles.primaryBtnText}>{label}</Text>
        </View>
      ) : (
        <View style={styles.btnContent}>
          {leftIcon && <View style={styles.btnIcon}>{leftIcon}</View>}
          <Text style={styles.primaryBtnText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// ── Secondary / Outline Button ────────────────────────────────

interface SecondaryButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  style?: ViewStyle;
}

export function SecondaryButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  leftIcon,
  style,
}: SecondaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[styles.secondaryBtn, isDisabled && styles.secondaryBtnDisabled, style]}
    >
      <View style={styles.btnContent}>
        {leftIcon && <View style={styles.btnIcon}>{leftIcon}</View>}
        <Text style={[styles.secondaryBtnText, isDisabled && styles.secondaryBtnTextDisabled]}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryBtn: {
    height: layout.btnHeightPrimary,
    backgroundColor: colors.btnPrimaryBg,
    borderRadius: radius.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.btnPaddingH,
  },
  primaryBtnDisabled: {
    backgroundColor: colors.btnPrimaryBgDisabled,
    opacity: 0.7,
  },
  primaryBtnText: {
    ...textStyles.button,
    color: colors.btnPrimaryText,
  },
  secondaryBtn: {
    height: layout.btnHeightSecondary,
    backgroundColor: colors.btnSecondaryBg,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.btnSecondaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: layout.btnPaddingH,
  },
  secondaryBtnDisabled: {
    opacity: 0.5,
  },
  secondaryBtnText: {
    ...textStyles.button,
    color: colors.btnSecondaryText,
  },
  secondaryBtnTextDisabled: {
    color: colors.textDisabled,
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  btnIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
