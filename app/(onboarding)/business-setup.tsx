// ─────────────────────────────────────────────────────────────
//  Screen 5 — Business Setup
//  Route: /(onboarding)/business-setup
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
import { businessSetupSchema, type BusinessSetupFormData } from '../../src/schemas';
import { workspaceService } from '../../src/services/workspace/workspaceService';
import { useAppStore, selectSelectedNiche, selectUser } from '../../src/store/appStore';
import { BUSINESS_NICHES, getPipelineSummary } from '../../src/types/niche';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import { SetupProgress } from '../../src/components/ui/OnboardingWidgets';
import { FormInput } from '../../src/components/ui/FormInput';
import { PrimaryButton } from '../../src/components/ui/Button';
import {
  ArrowLeftIcon,
  BuildingIcon,
  MegaphoneIcon,
  DumbbellIcon,
  PlaneIcon,
  LockIcon,
} from '../../src/components/ui/Icons';
import type { BusinessNicheId } from '../../src/types/niche';

const NICHE_ICONS: Record<BusinessNicheId, React.ReactNode> = {
  'real-estate': <BuildingIcon size={18} color={colors.primary} />,
  'marketing-agency': <MegaphoneIcon size={18} color={colors.primary} />,
  'gym-fitness': <DumbbellIcon size={18} color={colors.primary} />,
  'travel-tours': <PlaneIcon size={18} color={colors.primary} />,
};

export default function BusinessSetupScreen() {
  const insets = useSafeAreaInsets();
  const selectedNiche = useAppStore(selectSelectedNiche);
  const user = useAppStore(selectUser);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const [serverError, setServerError] = useState<string | null>(null);

  const nicheData = selectedNiche ? BUSINESS_NICHES[selectedNiche] : null;

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BusinessSetupFormData>({
    resolver: zodResolver(businessSetupSchema),
    defaultValues: {
      businessName: '',
      businessPhone: '',
      businessEmail: '',
      businessAddress: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = async (data: BusinessSetupFormData) => {
    if (!selectedNiche || !user) {
      setServerError('Missing niche or user. Please go back and try again.');
      return;
    }
    setServerError(null);
    try {
      const workspace = await workspaceService.createWorkspace(user.id, selectedNiche, data);
      completeOnboarding(workspace);
      router.replace('/(crm)/dashboard');
    } catch {
      setServerError('Failed to create workspace. Please try again.');
    }
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
        {/* Top Nav */}
        <View style={styles.topNav}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeftIcon size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.progressWrap}>
            <SetupProgress currentStep={2} totalSteps={2} label="WORKSPACE" />
          </View>
        </View>

        {/* Heading */}
        <View style={styles.heroSection}>
          <Text style={styles.heading}>Set up your workspace</Text>
          <Text style={styles.subheading}>
            This is how your team and customers will see you.
          </Text>
        </View>

        {/* Selected Niche Summary */}
        {nicheData && (
          <View style={styles.nicheSummary}>
            <View style={styles.nicheIconWrap}>
              {NICHE_ICONS[nicheData.id]}
            </View>
            <View style={styles.nicheInfo}>
              <Text style={styles.nicheTitle}>{nicheData.title}</Text>
              <Text style={styles.nicheStages} numberOfLines={1}>
                {getPipelineSummary(nicheData, 4)} → …
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => router.back()}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Form */}
        <View style={styles.formSurface}>
          <View style={styles.formFields}>
            <Controller
              control={control}
              name="businessName"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Business Name"
                  placeholder="UrbanNest Realty"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.businessName?.message}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="businessPhone"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Business Phone"
                  placeholder="+91 98480 12345"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.businessPhone?.message}
                  keyboardType="phone-pad"
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="businessEmail"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Business Email"
                  placeholder="hello@urbannest.in"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.businessEmail?.message}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />
              )}
            />

            <Controller
              control={control}
              name="businessAddress"
              render={({ field: { onChange, onBlur, value } }) => (
                <FormInput
                  label="Business Address (optional)"
                  placeholder="Plot 12, Jubilee Hills, Hyderabad"
                  value={value ?? ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.businessAddress?.message}
                  autoCapitalize="words"
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit(onSubmit)}
                />
              )}
            />
          </View>

          {serverError && (
            <View style={styles.serverError}>
              <Text style={styles.serverErrorText}>{serverError}</Text>
            </View>
          )}

          <PrimaryButton
            label={isSubmitting ? 'Creating workspace…' : 'Create Workspace'}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
          />
        </View>

        {/* Privacy Note */}
        <View style={styles.privacyNote}>
          <LockIcon size={14} color={colors.textSecondary} />
          <Text style={styles.privacyText}>
            Your data stays private. Cancel anytime.
          </Text>
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
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    marginBottom: spacing[3],
  },
  backBtn: {
    padding: spacing[0.5],
  },
  progressWrap: {
    flex: 1,
  },
  heroSection: {
    gap: spacing[1],
    marginBottom: spacing[2.5],
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
  nicheSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1.5],
    gap: spacing[1.5],
    marginBottom: spacing[2.5],
  },
  nicheIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radius.icon,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nicheInfo: {
    flex: 1,
  },
  nicheTitle: {
    ...textStyles.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  nicheStages: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
  changeText: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: '600',
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
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[0.5],
    marginTop: spacing[1],
  },
  privacyText: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
});
