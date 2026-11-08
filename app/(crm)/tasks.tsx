// ─────────────────────────────────────────────────────────────
//  Universal CRM — Tasks / Follow-ups Screen (Screen 13)
//  Today/Upcoming/Done tabs, overdue card, task list, CTA banner
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line, Rect } from 'react-native-svg';
import { colors, textStyles, layout, radius } from '../../src/theme';
import TabBar from '../../src/components/ui/TabBar';

const TABS = ['Today', 'Upcoming', 'Done'];

const TASKS_TODAY = [
  {
    id: '1',
    name: 'Call Rohan Iyer — overdue by 1 day',
    sub: 'Negotiation · Villa Kondapur · ₹1.6 Cr',
    assignee: null,
    done: false,
    overdue: true,
  },
  {
    id: '2',
    name: 'Aarav Mehta',
    sub: 'Site visit recap · 4:30 PM',
    assignee: 'Priya',
    done: true,
    overdue: false,
  },
  {
    id: '3',
    name: 'Diya Sharma',
    sub: 'Share offer letter · 6:00 PM',
    assignee: 'You',
    done: false,
    overdue: false,
  },
  {
    id: '4',
    name: 'Sana Sheikh',
    sub: 'Confirm visit slot · 7:15 PM',
    assignee: 'Arjun',
    done: false,
    overdue: false,
  },
];

function ChevronRightIcon({ color = '#252A26', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="9 18 15 12 9 6" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ArrowRightIcon({ color = '#fff', size = 18 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 5 19 12 12 19" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function CalendarIcon({ color = '#fff', size = 22 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="4" width="18" height="18" rx="2" stroke={color} strokeWidth={1.75} />
      <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

function PlusIcon({ color = '#fff', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="12" y1="5" x2="12" y2="19" stroke={color} strokeWidth={2} strokeLinecap="round" />
      <Line x1="5" y1="12" x2="19" y2="12" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function AlertCircleIcon({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" fill={color} />
      <Line x1="12" y1="8" x2="12" y2="12" stroke={colors.error} strokeWidth={2} strokeLinecap="round" />
      <Line x1="12" y1="16" x2="12.01" y2="16" stroke={colors.error} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState('Today');
  const [checkedTasks, setCheckedTasks] = useState<string[]>(['2']);

  const toggleTask = (id: string) => {
    setCheckedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Tasks</Text>
            <Text style={styles.subtitle}>6 due today · 3 overdue</Text>
          </View>
          <TouchableOpacity style={styles.addBtn} activeOpacity={0.85}>
            <PlusIcon />
            <Text style={styles.addBtnText}>Task</Text>
          </TouchableOpacity>
        </View>

        {/* ── Tabs ── */}
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.75}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Task List ── */}
        {TASKS_TODAY.map((task) => {
          const isDone = checkedTasks.includes(task.id);

          if (task.overdue) {
            return (
              <TouchableOpacity
                key={task.id}
                style={styles.overdueCard}
                activeOpacity={0.75}
              >
                <AlertCircleIcon size={36} color={colors.error} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.overdueTitle}>{task.name}</Text>
                  <Text style={styles.overdueSub}>{task.sub}</Text>
                </View>
                <ChevronRightIcon color={colors.textSecondary} />
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={task.id}
              style={styles.taskCard}
              activeOpacity={0.75}
            >
              <TouchableOpacity
                style={[styles.checkbox, isDone && styles.checkboxDone]}
                onPress={() => toggleTask(task.id)}
                activeOpacity={0.75}
              >
                {isDone && (
                  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                    <Polyline points="20 6 9 17 4 12" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                  </Svg>
                )}
              </TouchableOpacity>
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskName, isDone && styles.taskNameDone]}>{task.name}</Text>
                <Text style={styles.taskSub}>{task.sub}</Text>
              </View>
              {task.assignee && (
                <View style={styles.assigneePill}>
                  <Text style={styles.assigneeText}>{task.assignee}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        {/* ── CTA Banner ── */}
        <TouchableOpacity style={styles.ctaBanner} activeOpacity={0.85}>
          <View style={styles.ctaIconWrap}>
            <CalendarIcon size={22} color={colors.textInverse} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Schedule a follow-up</Text>
            <Text style={styles.ctaSubtitle}>Never lose a hot lead again</Text>
          </View>
          <ArrowRightIcon color={colors.textInverse} size={18} />
        </TouchableOpacity>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  addBtnText: { fontFamily: 'Manrope_600SemiBold', fontSize: 14, color: colors.textInverse },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.bgMuted,
    borderRadius: radius.cardLg,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radius.card,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: colors.bgSurface },
  tabText: { fontFamily: 'Manrope_500Medium', fontSize: 14, color: colors.textSecondary },
  tabTextActive: { fontFamily: 'Manrope_700Bold', color: colors.textPrimary },
  overdueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.error,
    padding: 14,
  },
  overdueTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  overdueSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2, lineHeight: 18 },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  taskName: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textPrimary },
  taskNameDone: { color: colors.textSecondary, textDecorationLine: 'line-through' },
  taskSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  assigneePill: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  assigneeText: { fontFamily: 'Manrope_500Medium', fontSize: 12, color: colors.textSecondary },
  ctaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.primary,
    borderRadius: radius.cardLg,
    padding: 16,
    marginTop: 4,
  },
  ctaIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaTitle: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.textInverse },
  ctaSubtitle: { ...textStyles.caption, color: 'rgba(255,254,250,0.6)', marginTop: 2 },
});

