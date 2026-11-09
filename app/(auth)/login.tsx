// ─────────────────────────────────────────────────────────────
//  Screen 2 — Login
//  Route: /(auth)/login
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
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { loginSchema, type LoginFormData } from '../../src/schemas';
import { authService } from '../../src/services/auth/authService';
import { useAppStore } from '../../src/store/appStore';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import { BrandHeader } from '../../src/components/ui/BrandHeader';
import { FormInput } from '../../src/components/ui/FormInput';
import { PasswordInput } from '../../src/components/ui/PasswordInput';
import { PrimaryButton, SecondaryButton } from '../../src/components/ui/Button';
import { Divider, InlineError } from '../../src/components/ui/OnboardingWidgets';
import { GoogleIcon, ChevronRightIcon } from '../../src/components/ui/Icons';

// Demo credentials shown during development
const DEMO_EMAIL = 'sreekar@urbannest.in';
const DEMO_PASSWORD = 'Demo@1234';

export default function LoginScreen() {
  const insets = useSafeAreaInsets();
  const loginUser = useAppStore((s) => s.loginUser);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const session = await authService.login(data);
      // loginUser sets authState → 'ready', root layout redirects to dashboard
      loginUser(session);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  const fillDemoCredentials = () => {
    setValue('identifier', DEMO_EMAIL, { shouldValidate: false });
    setValue('password', DEMO_PASSWORD, { shouldValidate: false });
  };

  const handleGoogleSignIn = () => {
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
        {/* Brand */}
        <View style={styles.header}>
          <BrandHeader />
        </View>

        {/* Workspace Summary (shows demo/returning user context) */}
        <TouchableOpacity style={styles.workspaceBanner} activeOpacity={0.85} onPress={() => {}}>
          <View style={styles.workspaceAvatar}>
            <Text style={styles.workspaceAvatarText}>SR</Text>
          </View>
          <View style={styles.workspaceInfo}>
            <Text style={styles.workspaceName}>
              {'UrbanNest Realty'}
            </Text>
            <Text style={styles.workspaceLastLogin}>Last login · Yesterday, 6:12 PM</Text>
          </View>
          <ChevronRightIcon size={16} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Heading */}
        <View style={styles.heroSection}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subheading}>Pick up right where your pipeline left off.</Text>
        </View>

        {/* Form */}
        <View style={styles.formSurface}>
          <View style={styles.formFields}>
            <Controller
              control={control}
              name="identifier"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Email or Phone Number"
                  placeholder="sreekar@urbannest.in"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.identifier?.message}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    error={errors.password?.message}
                    returnKeyType="done"
                    onSubmitEditing={handleSubmit(onSubmit)}
                  />
                  <Link href="/(auth)/forgot-password" asChild>
                    <TouchableOpacity style={styles.forgotBtn}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              )}
            />
          </View>

          {/* Server Error */}
          {serverError && <InlineError message={serverError} />}

          {/* Log In CTA */}
          <PrimaryButton
            label={isSubmitting ? 'Logging in…' : 'Log In'}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
          />

          {/* OTP Login */}
          <SecondaryButton
            label="Login with OTP instead"
            onPress={() => setServerError('OTP login coming soon.')}
          />

          <Divider label="OR" />

          {/* Google */}
          <SecondaryButton
            label="Continue with Google"
            onPress={handleGoogleSignIn}
            leftIcon={<GoogleIcon size={18} />}
          />
        </View>

        {/* Dev-only demo shortcut */}
        <TouchableOpacity style={styles.demoBtn} onPress={fillDemoCredentials}>
          <Text style={styles.demoBtnText}>
            DEV · Fill demo credentials ({DEMO_EMAIL})
          </Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>New to UnivCRM? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Create account</Text>
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
    marginBottom: spacing[2],
  },
  workspaceBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1.5],
    marginBottom: spacing[3],
    gap: spacing[1.5],
  },
  workspaceAvatar: {
    width: 38,
    height: 38,
    borderRadius: radius.chip,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workspaceAvatarText: {
    ...textStyles.label,
    color: colors.primary,
    fontSize: 13,
  },
  workspaceInfo: {
    flex: 1,
  },
  workspaceName: {
    ...textStyles.bodyMedium,
    color: colors.textPrimary,
  },
  workspaceLastLogin: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
  heroSection: {
    gap: spacing[0.5],
    marginBottom: spacing[3],
  },
  heading: {
    ...textStyles.screenHeading,
    color: colors.textPrimary,
  },
  subheading: {
    ...textStyles.body,
    color: colors.textSecondary,
  },
  formSurface: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.cardLg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[2.5],
    gap: spacing[2],
    marginBottom: spacing[2],
  },
  formFields: {
    gap: layout.formFieldGap,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 6,
  },
  forgotText: {
    ...textStyles.caption,
    color: colors.textError,
    fontWeight: '600',
  },
  demoBtn: {
    alignSelf: 'center',
    paddingVertical: spacing[1],
    marginBottom: spacing[2],
  },
  demoBtnText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    marginTop: spacing[1],
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
