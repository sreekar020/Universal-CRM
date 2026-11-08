// ─────────────────────────────────────────────────────────────
//  Universal CRM — Custom Bottom Tab Bar
//  Used across all main CRM screens: Home, Leads, Pipeline, Tasks, More
// ─────────────────────────────────────────────────────────────

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { router, usePathname } from 'expo-router';
import Svg, { Path, Circle, Rect, Polyline } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, textStyles, spacing } from '../../theme';

interface TabItem {
  key: string;
  label: string;
  route: string;
  icon: (active: boolean) => React.ReactNode;
}

function HomeTabIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textSecondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="9 22 9 12 15 12 15 22" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LeadsTabIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textSecondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="9" cy="7" r="4" stroke={c} strokeWidth={1.75} />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PipelineTabIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textSecondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="4" height="18" rx="1" stroke={c} strokeWidth={1.75} />
      <Rect x="10" y="8" width="4" height="13" rx="1" stroke={c} strokeWidth={1.75} />
      <Rect x="17" y="13" width="4" height="8" rx="1" stroke={c} strokeWidth={1.75} />
    </Svg>
  );
}

function TasksTabIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textSecondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={c} strokeWidth={1.75} />
      <Polyline points="9 12 11 14 15 10" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MoreTabIcon({ active }: { active: boolean }) {
  const c = active ? colors.primary : colors.textSecondary;
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth={1.75} />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={c} strokeWidth={1.75} />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={c} strokeWidth={1.75} />
      <Rect x="14" y="14" width="7" height="7" rx="1" stroke={c} strokeWidth={1.75} />
    </Svg>
  );
}

const TABS: TabItem[] = [
  {
    key: 'home',
    label: 'Home',
    route: '/(crm)/dashboard',
    icon: (active) => <HomeTabIcon active={active} />,
  },
  {
    key: 'leads',
    label: 'Leads',
    route: '/(crm)/leads',
    icon: (active) => <LeadsTabIcon active={active} />,
  },
  {
    key: 'pipeline',
    label: 'Pipeline',
    route: '/(crm)/pipeline',
    icon: (active) => <PipelineTabIcon active={active} />,
  },
  {
    key: 'tasks',
    label: 'Tasks',
    route: '/(crm)/tasks',
    icon: (active) => <TasksTabIcon active={active} />,
  },
  {
    key: 'more',
    label: 'More',
    route: '/(crm)/settings',
    icon: (active) => <MoreTabIcon active={active} />,
  },
];

function getActiveKey(pathname: string): string {
  if (pathname.includes('/leads') || pathname.includes('/lead-details') || pathname.includes('/add-lead')) return 'leads';
  if (pathname.includes('/pipeline')) return 'pipeline';
  if (pathname.includes('/tasks')) return 'tasks';
  if (pathname.includes('/settings') || pathname.includes('/contacts') || pathname.includes('/notifications') || pathname.includes('/team') || pathname.includes('/quotes')) return 'more';
  return 'home';
}

export default function TabBar() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const activeKey = getActiveKey(pathname);

  return (
    <View style={[styles.container, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconWrap, isActive && styles.iconWrapActive]}>
              {tab.icon(isActive)}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.dot} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.bgSurface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingBottom: 2,
  },
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: colors.bgMuted,
  },
  label: {
    ...textStyles.overline,
    fontSize: 10,
    color: colors.textSecondary,
    letterSpacing: 0,
  },
  labelActive: {
    color: colors.primary,
    fontFamily: 'Manrope_700Bold',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.accent,
    marginTop: 1,
  },
});

