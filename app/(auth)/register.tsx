// ─────────────────────────────────────────────────────────────
//  Screen 1 — Registration
//  Route: /(auth)/register
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
  Switch,
} from 'react-native';
import { router, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { registerSchema, type RegisterFormData } from '../../src/schemas';
import { authService } from '../../src/services/auth/authService';
import { useAppStore } from '../../src/store/appStore';
import { colors, textStyles, spacing, layout, radius, BRAND } from '../../src/theme';
import { BrandHeader } from '../../src/components/ui/BrandHeader';
import { FormInput } from '../../src/components/ui/FormInput';
import { PasswordInput } from '../../src/components/ui/PasswordInput';
import { PrimaryButton, SecondaryButton } from '../../src/components/ui/Button';
import { Divider } from '../../src/components/ui/OnboardingWidgets';
import { GoogleIcon, PhoneIcon } from '../../src/components/ui/Icons';

export default function RegisterScreen() {
  const insets = useSafeAreaInsets();
  const setSession = useAppStore((s) => s.setSession);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    try {
      const session = await authService.register(data);
      setSession(session);
      router.replace('/(onboarding)/business-preferences');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    }
  };

  const handleGoogleSignIn = () => {
    // Google OAuth — not implemented in frontend-only milestone
    setServerError('Google Sign-In is not available in this build.');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Brand Header */}
        <View style={styles.header}>
          <BrandHeader />
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroHeading}>Build better customer relationships.</Text>
          <Text style={styles.heroBody}>{BRAND.descriptor}</Text>
        </View>

        {/* Form Surface */}
        <View style={styles.formSurface}>
          <View style={styles.formFields}>
            {/* Full Name */}
            <Controller
              control={control}
              name="fullName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Sreekar Reddy"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.fullName?.message}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              )}
            />

            {/* Email */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Email Address"
                  placeholder="sreekar@urbannest.in"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              )}
            />

            {/* Phone */}
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Phone Number"
                  placeholder="+91 98480 12345"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.phone?.message}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                  rightIcon={<PhoneIcon size={18} color={colors.textSecondary} />}
                />
              )}
            />

            {/* Password */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  label="Password"
                  placeholder="Min 8 chars, 1 uppercase, 1 number"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password?.message}
                  returnKeyType="next"
                />
              )}
            />

            {/* Confirm Password */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({ field: { onChange, onBlur, value } }) => (
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword?.message}
                  returnKeyType="done"
                />
              )}
            />

            {/* Terms */}
            <Controller
              control={control}
              name="agreedToTerms"
              render={({ field: { onChange, value } }) => (
                <View>
                  <View style={styles.termsRow}>
                    <Switch
                      value={value}
                      onValueChange={onChange}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor={colors.bgSurface}
                      style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }] }}
                    />
                    <Text style={styles.termsText}>
                      I agree to the{' '}
                      <Text style={styles.termsLink}>Terms of Service</Text>
                      {' '}and{' '}
                      <Text style={styles.termsLink}>Privacy Policy</Text>.
                    </Text>
                  </View>
                  {errors.agreedToTerms && (
                    <Text style={styles.fieldError}>{errors.agreedToTerms.message}</Text>
                  )}
                </View>
              )}
            />
          </View>

          {/* Server Error */}
          {serverError && (
            <View style={styles.serverError}>
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          )}

          {/* Create Account CTA */}
          <PrimaryButton
            label={isSubmitting ? 'Creating account…' : 'Create Account'}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.cta}
          />

          <Divider label="OR" />

          {/* Google */}
          <SecondaryButton
            label="Continue with Google"
            onPress={handleGoogleSignIn}
            leftIcon={<GoogleIcon size={18} />}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Link href="/(auth)/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    flexGrow: 1,
  },
  header: {
    marginBottom: spacing[3],
  },
  hero: {
    marginBottom: spacing[3],
    gap: spacing[1],
  },
  heroHeading: {
    ...textStyles.heroHeading,
    color: colors.textPrimary,
  },
  heroBody: {
    ...textStyles.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  formSurface: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[2.5],
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  formFields: {
    gap: layout.formFieldGap,
  },
  termsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },
  termsText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  fieldError: {
    ...textStyles.caption,
    color: colors.textError,
    marginTop: 4,
    marginLeft: 2,
  },
  serverError: {
    backgroundColor: colors.errorBg,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.borderError,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
  },
  serverErrorText: {
    ...textStyles.caption,
    color: colors.textError,
  },
  cta: {
    marginTop: spacing[0.5],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
  },
  footerText: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
  footerLink: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: '700',
  },
});
