// ─────────────────────────────────────────────────────────────
//  Screen 3 — Forgot Password
//  Route: /(auth)/forgot-password
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  forgotPasswordEmailSchema,
  forgotPasswordPhoneSchema,
  type ForgotPasswordEmailData,
  type ForgotPasswordPhoneData,
} from '../../src/schemas';
import { authService } from '../../src/services/auth/authService';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import { FormInput } from '../../src/components/ui/FormInput';
import { PrimaryButton } from '../../src/components/ui/Button';
import { ArrowLeftIcon, MailIcon } from '../../src/components/ui/Icons';

type RecoveryMethod = 'email' | 'phone';

export default function ForgotPasswordScreen() {
  const insets = useSafeAreaInsets();
  const [method, setMethod] = useState<RecoveryMethod>('email');
  const [sent, setSent] = useState(false);
  const [sentDestination, setSentDestination] = useState('');
  const [serverError, setServerError] = useState<string | null>(null);

  // Email form
  const emailForm = useForm<ForgotPasswordEmailData>({
    resolver: zodResolver(forgotPasswordEmailSchema),
    defaultValues: { email: '' },
    mode: 'onTouched',
  });

  // Phone form
  const phoneForm = useForm<ForgotPasswordPhoneData>({
    resolver: zodResolver(forgotPasswordPhoneSchema),
    defaultValues: { phone: '' },
    mode: 'onTouched',
  });

  const isSubmitting = emailForm.formState.isSubmitting || phoneForm.formState.isSubmitting;

  const handleEmailSubmit = async (data: ForgotPasswordEmailData) => {
    setServerError(null);
    try {
      const result = await authService.sendResetLink(data.email);
      if (result.sent) {
        setSentDestination(result.destination);
        setSent(true);
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    }
  };

  const handlePhoneSubmit = async (data: ForgotPasswordPhoneData) => {
    setServerError(null);
    try {
      const result = await authService.sendResetOtp(data.phone);
      if (result.sent) {
        setSentDestination(result.destination);
        setSent(true);
      }
    } catch {
      setServerError('Something went wrong. Please try again.');
    }
  };

  const handleResend = () => {
    setSent(false);
    setSentDestination('');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 40 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <ArrowLeftIcon size={22} color={colors.textPrimary} />
        </TouchableOpacity>

        {/* Heading */}
        <View style={styles.heroSection}>
          <Text style={styles.heading}>Reset your password</Text>
          <Text style={styles.subheading}>
            {method === 'email'
              ? "Enter the email linked to your workspace. We'll send a secure reset link."
              : "Enter your registered phone number. We'll send a one-time passcode."}
          </Text>
        </View>

        {/* Method Selector */}
        <View style={styles.segmented}>
          <TouchableOpacity
            style={[styles.segmentBtn, method === 'email' && styles.segmentBtnActive]}
            onPress={() => setMethod('email')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, method === 'email' && styles.segmentTextActive]}>
              Email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.segmentBtn, method === 'phone' && styles.segmentBtnActive]}
            onPress={() => setMethod('phone')}
            activeOpacity={0.8}
          >
            <Text style={[styles.segmentText, method === 'phone' && styles.segmentTextActive]}>
              Phone OTP
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form — Email */}
        {!sent && method === 'email' && (
          <View style={styles.formBlock}>
            <Controller
              control={emailForm.control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Work Email"
                  placeholder="sreekar@urbannest.in"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={emailForm.formState.errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  rightIcon={<MailIcon size={18} color={colors.textSecondary} />}
                />
              )}
            />
            {serverError && (
              <Text style={styles.errorText}>{serverError}</Text>
            )}
            <PrimaryButton
              label={isSubmitting ? 'Sending…' : 'Send Reset Link'}
              onPress={emailForm.handleSubmit(handleEmailSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        )}

        {/* Form — Phone */}
        {!sent && method === 'phone' && (
          <View style={styles.formBlock}>
            <Controller
              control={phoneForm.control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Phone Number"
                  placeholder="+91 98480 12345"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={phoneForm.formState.errors.phone?.message}
                  keyboardType="phone-pad"
                />
              )}
            />
            {serverError && (
              <Text style={styles.errorText}>{serverError}</Text>
            )}
            <PrimaryButton
              label={isSubmitting ? 'Sending OTP…' : 'Send OTP'}
              onPress={phoneForm.handleSubmit(handlePhoneSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting}
            />
          </View>
        )}

        {/* Confirmation Surface */}
        {sent && (
          <View style={styles.confirmationCard}>
            <View style={styles.confirmIconWrap}>
              <MailIcon size={28} color={colors.primary} />
            </View>
            <Text style={styles.confirmTitle}>Check your inbox</Text>
            <Text style={styles.confirmBody}>
              {method === 'email'
                ? `We sent a reset link to ${sentDestination}. It expires in 30 minutes.`
                : `We sent a one-time code to ${sentDestination}.`}
            </Text>
            <Text style={styles.confirmNote}>
              Didn't get it?{' '}
              <Text style={styles.resendLink} onPress={handleResend}>
                Resend
              </Text>
            </Text>
          </View>
        )}

        {/* Back to Login */}
        <TouchableOpacity
          style={styles.backToLogin}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.backToLoginText}>Back to Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    flexGrow: 1,
  },
  backBtn: {
    marginBottom: spacing[3],
    alignSelf: 'flex-start',
    padding: spacing[0.5],
  },
  heroSection: {
    gap: spacing[1],
    marginBottom: spacing[3],
  },
  heading: {
    ...textStyles.screenHeading,
    color: colors.textPrimary,
  },
  subheading: {
    ...textStyles.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.bgMuted,
    borderRadius: radius.card,
    padding: 4,
    marginBottom: spacing[3],
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: spacing[1],
    borderRadius: radius.md,
    alignItems: 'center',
  },
  segmentBtnActive: {
    backgroundColor: colors.bgSurface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  segmentText: {
    ...textStyles.bodyMedium,
    color: colors.textSecondary,
    fontSize: 14,
  },
  segmentTextActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  formBlock: {
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  errorText: {
    ...textStyles.caption,
    color: colors.textError,
  },
  confirmationCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[3],
    alignItems: 'center',
    gap: spacing[1],
    marginBottom: spacing[3],
  },
  confirmIconWrap: {
    width: 52,
    height: 52,
    borderRadius: radius.chip,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing[1],
  },
  confirmTitle: {
    ...textStyles.sectionHeading,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  confirmBody: {
    ...textStyles.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  confirmNote: {
    ...textStyles.caption,
    color: colors.textSecondary,
    marginTop: spacing[0.5],
  },
  resendLink: {
    color: colors.primary,
    fontWeight: '700',
  },
  backToLogin: {
    alignSelf: 'center',
    paddingVertical: spacing[1],
  },
  backToLoginText: {
    ...textStyles.bodyMedium,
    color: colors.primary,
    fontWeight: '600',
  },
});
