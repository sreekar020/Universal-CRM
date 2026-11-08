// ─────────────────────────────────────────────────────────────
//  Universal CRM — PasswordInput Component
//  FormInput specialization with show/hide toggle
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import type { TextInputProps } from 'react-native';
import { FormInput } from './FormInput';
import { EyeIcon, EyeOffIcon } from './Icons';
import { colors } from '../../theme';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry' | 'style'> {
  label: string;
  error?: string;
}

export function PasswordInput({ label, error, ...inputProps }: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <FormInput
      label={label}
      error={error}
      secureTextEntry={!visible}
      autoCapitalize="none"
      autoCorrect={false}
      rightIcon={
        visible ? (
          <EyeOffIcon size={20} color={colors.textSecondary} />
        ) : (
          <EyeIcon size={20} color={colors.textSecondary} />
        )
      }
      onRightIconPress={() => setVisible((v) => !v)}
      {...inputProps}
    />
  );
}
