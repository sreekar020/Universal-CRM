// ─────────────────────────────────────────────────────────────
//  Screen 4 — Business Preferences
//  Route: /(onboarding)/business-preferences
// ─────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BusinessNicheId } from '../../src/types/niche';
import { BUSINESS_NICHES, getPipelineSummary } from '../../src/types/niche';
import { useAppStore, selectSelectedNiche } from '../../src/store/appStore';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import { SetupProgress, NicheCard } from '../../src/components/ui/OnboardingWidgets';
import { PrimaryButton } from '../../src/components/ui/Button';
import {
  BuildingIcon,
  MegaphoneIcon,
  DumbbellIcon,
  PlaneIcon,
} from '../../src/components/ui/Icons';

const NICHE_ICONS: Record<BusinessNicheId, React.ReactNode> = {
  'real-estate': <BuildingIcon size={22} color={colors.primary} />,
  'marketing-agency': <MegaphoneIcon size={22} color={colors.primary} />,
  'gym-fitness': <DumbbellIcon size={22} color={colors.primary} />,
  'travel-tours': <PlaneIcon size={22} color={colors.primary} />,
};

const NICHE_ORDER: BusinessNicheId[] = [
  'real-estate',
  'marketing-agency',
  'gym-fitness',
  'travel-tours',
];

export default function BusinessPreferencesScreen() {
  const insets = useSafeAreaInsets();
  const selectedNiche = useAppStore(selectSelectedNiche);
  const setOnboardingNiche = useAppStore((s) => s.setOnboardingNiche);

  const selectedNicheData = selectedNiche ? BUSINESS_NICHES[selectedNiche] : null;

  const handleContinue = () => {
    if (!selectedNiche) return;
    router.push('/(onboarding)/business-setup');
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress + Skip */}
        <View style={styles.progressRow}>
          <View style={styles.progressWrap}>
            <SetupProgress currentStep={1} totalSteps={2} />
          </View>
          <TouchableOpacity
            onPress={() => router.replace('/(crm)/dashboard')}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </View>

        {/* Heading */}
        <View style={styles.heroSection}>
          <Text style={styles.heading}>What type of business do you run?</Text>
          <Text style={styles.subheading}>
            We'll configure your pipeline, fields and templates automatically.
          </Text>
        </View>

        {/* Niche Grid */}
        <View style={styles.grid}>
          {NICHE_ORDER.map((nicheId, index) => {
            const niche = BUSINESS_NICHES[nicheId];
            return (
              <View key={nicheId} style={index % 2 === 0 ? styles.gridLeft : styles.gridRight}>
                <NicheCard
                  title={niche.title}
                  description={niche.description}
                  icon={NICHE_ICONS[nicheId]}
                  selected={selectedNiche === nicheId}
                  onPress={() => setOnboardingNiche(nicheId)}
                />
              </View>
            );
          })}
        </View>

        {/* Pipeline Summary */}
        {selectedNicheData && (
          <View style={styles.summaryCard}>
            <View style={styles.summaryIconWrap}>
              {NICHE_ICONS[selectedNicheData.id]}
            </View>
            <Text style={styles.summaryText}>
              <Text style={styles.summaryBold}>{selectedNicheData.title} pipeline</Text>
              {' · '}
              {selectedNicheData.stages.length} stages
              {' · '}
              {selectedNicheData.customFields.length} custom fields
            </Text>
          </View>
        )}

        {/* Stage Preview */}
        {selectedNicheData && (
          <Text style={styles.stagePreview} numberOfLines={1}>
            {getPipelineSummary(selectedNicheData)}
            {' → …'}
          </Text>
        )}

        {/* Continue */}
        <PrimaryButton
          label="Continue"
          onPress={handleContinue}
          disabled={!selectedNiche}
          style={styles.cta}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    flexGrow: 1,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[3],
    gap: spacing[2],
  },
  progressWrap: {
    flex: 1,
  },
  skipText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  heroSection: {
    gap: spacing[1],
    marginBottom: spacing[3],
  },
  heading: {
    ...textStyles.heroHeading,
    color: colors.textPrimary,
  },
  subheading: {
    ...textStyles.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[1.5],
    marginBottom: spacing[2],
  },
  gridLeft: {
    width: '48%',
  },
  gridRight: {
    width: '48%',
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1.5],
    gap: spacing[1],
    marginBottom: spacing[1],
  },
  summaryIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radius.icon,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  summaryBold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  stagePreview: {
    ...textStyles.caption,
    color: colors.textSecondary,
    marginBottom: spacing[2.5],
    paddingLeft: spacing[0.5],
  },
  cta: {
    marginTop: 'auto',
  },
});
