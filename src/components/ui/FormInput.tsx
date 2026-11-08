// ─────────────────────────────────────────────────────────────
//  Universal CRM — FormInput Component
//  Controlled text input with label, validation state, and icons
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type TextInputProps,
} from 'react-native';
import { colors, textStyles, spacing, layout, radius } from '../../theme';

interface FormInputProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  hint?: string;
}

export function FormInput({
  label,
  error,
  rightIcon,
  onRightIconPress,
  hint,
  ...inputProps
}: FormInputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.inputBorderError
    : focused
    ? colors.inputBorderFocus
    : colors.inputBorder;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, { borderColor }]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.inputPlaceholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.iconButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    ...textStyles.label,
    color: colors.textPrimary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: layout.inputHeight,
    borderWidth: 1,
    borderRadius: radius.input,
    backgroundColor: colors.inputBg,
    paddingHorizontal: layout.inputPaddingH,
  },
  input: {
    flex: 1,
    ...textStyles.input,
    color: colors.inputText,
    paddingVertical: 0,
  },
  iconButton: {
    padding: spacing[0.5],
    marginLeft: spacing[1],
  },
  errorText: {
    ...textStyles.caption,
    color: colors.textError,
  },
  hintText: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
});
