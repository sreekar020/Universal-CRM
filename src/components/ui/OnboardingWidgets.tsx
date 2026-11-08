// ─────────────────────────────────────────────────────────────
//  Universal CRM — SetupProgress & NicheCard components
// ─────────────────────────────────────────────────────────────

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, textStyles, spacing, radius, layout } from '../../theme';
import { CheckIcon } from './Icons';

// ── SetupProgress ─────────────────────────────────────────────

interface SetupProgressProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
}

export function SetupProgress({ currentStep, totalSteps, label = 'SETUP' }: SetupProgressProps) {
  return (
    <View style={progressStyles.container}>
      <Text style={progressStyles.stepLabel}>
        STEP {currentStep} OF {totalSteps} · {label}
      </Text>
      <View style={progressStyles.barTrack}>
        <View
          style={[
            progressStyles.barFill,
            { width: `${(currentStep / totalSteps) * 100}%` },
          ]}
        />
      </View>
    </View>
  );
}

const progressStyles = StyleSheet.create({
  container: {
    gap: spacing[0.5],
  },
  stepLabel: {
    ...textStyles.overline,
    color: colors.textSecondary,
  },
  barTrack: {
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radius.chip,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.chip,
  },
});

// ── NicheCard ─────────────────────────────────────────────────

interface NicheCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onPress: () => void;
}

export function NicheCard({ title, description, icon, selected, onPress }: NicheCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[cardStyles.card, selected && cardStyles.cardSelected]}
    >
      <View style={cardStyles.iconWrap}>{icon}</View>
      <Text style={cardStyles.title}>{title}</Text>
      <Text style={cardStyles.description}>{description}</Text>

      {selected && (
        <View style={cardStyles.checkBadge}>
          <CheckIcon size={10} color={colors.textInverse} strokeWidth={3} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1.5,
    borderColor: colors.border,
    padding: layout.cardPadding,
    gap: spacing[0.5],
    minHeight: 130,
    position: 'relative',
  },
  cardSelected: {
    borderColor: colors.nicheSelectedBorder,
    backgroundColor: colors.bgMuted,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.icon,
    backgroundColor: colors.nicheIconBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[0.5],
  },
  title: {
    ...textStyles.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  description: {
    ...textStyles.caption,
    color: colors.textSecondary,
    lineHeight: 17,
  },
  checkBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 20,
    height: 20,
    borderRadius: radius.chip,
    backgroundColor: colors.nicheSelectedIndicator,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// ── Divider ───────────────────────────────────────────────────

interface DividerProps {
  label?: string;
}

export function Divider({ label }: DividerProps) {
  return (
    <View style={dividerStyles.container}>
      <View style={dividerStyles.line} />
      {label && <Text style={dividerStyles.label}>{label}</Text>}
      <View style={dividerStyles.line} />
    </View>
  );
}

const dividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1.5],
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  label: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
});

// ── InlineError ────────────────────────────────────────────────

interface InlineErrorProps {
  message: string;
}

export function InlineError({ message }: InlineErrorProps) {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.text}>{message}</Text>
    </View>
  );
}

const errorStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.errorBg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderError,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  text: {
    ...textStyles.caption,
    color: colors.textError,
  },
});
