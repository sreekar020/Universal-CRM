// ─────────────────────────────────────────────────────────────
//  CRM Dashboard — Initial Shell
//  Displays business context and key metrics post-onboarding.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppStore, selectUser, selectWorkspace, selectSelectedNiche } from '../../src/store/appStore';
import { BUSINESS_NICHES } from '../../src/types/niche';
import type { BusinessNicheId } from '../../src/types/niche';
import { colors, textStyles, spacing, layout, radius } from '../../src/theme';
import { BRAND } from '../../src/theme';
import {
  BuildingIcon,
  MegaphoneIcon,
  DumbbellIcon,
  PlaneIcon,
} from '../../src/components/ui/Icons';

const NICHE_ICONS: Record<BusinessNicheId, React.ReactNode> = {
  'real-estate': <BuildingIcon size={20} color={colors.textInverse} />,
  'marketing-agency': <MegaphoneIcon size={20} color={colors.textInverse} />,
  'gym-fitness': <DumbbellIcon size={20} color={colors.textInverse} />,
  'travel-tours': <PlaneIcon size={20} color={colors.textInverse} />,
};

interface MetricCardProps {
  label: string;
  value: string;
  sub?: string;
}

function MetricCard({ label, value, sub }: MetricCardProps) {
  return (
    <View style={metricStyles.card}>
      <Text style={metricStyles.value}>{value}</Text>
      <Text style={metricStyles.label}>{label}</Text>
      {sub && <Text style={metricStyles.sub}>{sub}</Text>}
    </View>
  );
}

const metricStyles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[2],
    gap: 2,
  },
  value: {
    ...textStyles.screenHeading,
    color: colors.textPrimary,
    fontSize: 26,
  },
  label: {
    ...textStyles.caption,
    color: colors.textSecondary,
  },
  sub: {
    ...textStyles.caption,
    color: colors.accent,
    fontWeight: '600',
  },
});

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();
  const user = useAppStore(selectUser);
  const workspace = useAppStore(selectWorkspace);
  const selectedNiche = useAppStore(selectSelectedNiche);
  const logout = useAppStore((s) => s.logout);

  const nicheData = selectedNiche ? BUSINESS_NICHES[selectedNiche] : null;
  const firstName = user?.fullName.split(' ')[0] ?? 'there';

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>Good morning, {firstName} 👋</Text>
            <Text style={styles.workspaceName}>{workspace?.name ?? BRAND.name}</Text>
          </View>
          {selectedNiche && (
            <View style={styles.nichePill}>
              {NICHE_ICONS[selectedNiche]}
            </View>
          )}
        </View>

        {/* Metrics */}
        <Text style={styles.sectionLabel}>TODAY'S OVERVIEW</Text>
        <View style={styles.metricsRow}>
          <MetricCard label="Total Leads" value="24" />
          <MetricCard label="New Today" value="3" sub="+2 vs yesterday" />
        </View>
        <View style={styles.metricsRow}>
          <MetricCard label="Active Deals" value="8" />
          <MetricCard label="Follow-ups Due" value="5" sub="Today" />
        </View>

        {/* Pipeline Overview */}
        {nicheData && (
          <>
            <Text style={styles.sectionLabel}>PIPELINE</Text>
            <View style={styles.pipelineCard}>
              <Text style={styles.pipelineTitle}>{nicheData.pipelineLabel}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.stageRow}>
                  {nicheData.stages.map((stage, i) => (
                    <View key={stage.id} style={styles.stageChip}>
                      <Text style={styles.stageChipText}>{stage.label}</Text>
                      <Text style={styles.stageCount}>{Math.floor(Math.random() * 6)}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
          </>
        )}

        {/* Quick Actions */}
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>+ Add Lead</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Text style={styles.actionBtnText}>+ Add Task</Text>
          </TouchableOpacity>
        </View>

        {/* Dev: Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>Log Out (dev)</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    flexGrow: 1,
    gap: spacing[2],
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing[1],
  },
  greeting: {
    ...textStyles.body,
    color: colors.textSecondary,
  },
  workspaceName: {
    ...textStyles.sectionHeading,
    color: colors.textPrimary,
  },
  nichePill: {
    width: 44,
    height: 44,
    borderRadius: radius.card,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    ...textStyles.overline,
    color: colors.textSecondary,
    marginBottom: spacing[0.5],
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing[1.5],
  },
  pipelineCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing[2],
    gap: spacing[1],
  },
  pipelineTitle: {
    ...textStyles.bodyMedium,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  stageRow: {
    flexDirection: 'row',
    gap: spacing[1],
    paddingBottom: spacing[0.5],
  },
  stageChip: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: spacing[1.5],
    paddingVertical: spacing[0.5],
    alignItems: 'center',
    gap: 2,
  },
  stageChipText: {
    ...textStyles.caption,
    color: colors.textPrimary,
    fontWeight: '500',
    fontSize: 11,
  },
  stageCount: {
    ...textStyles.caption,
    color: colors.primary,
    fontWeight: '700',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: spacing[1.5],
  },
  actionBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingVertical: spacing[1.5],
    alignItems: 'center',
  },
  actionBtnText: {
    ...textStyles.button,
    color: colors.textInverse,
  },
  logoutBtn: {
    alignSelf: 'center',
    marginTop: spacing[3],
    paddingVertical: spacing[1],
  },
  logoutText: {
    ...textStyles.caption,
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
