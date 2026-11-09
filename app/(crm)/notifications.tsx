// ─────────────────────────────────────────────────────────────
//  Universal CRM — Notifications Screen (Screen 17)
//  Grouped Today/Yesterday, unread accent border, mark all read
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

function ArrowLeftIcon({ color = '#252A26', size = 20 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const NOTIFICATIONS = {
  TODAY: [
    {
      id: '1',
      type: 'alarm',
      title: 'Follow-up in 30 minutes',
      desc: 'Aarav Mehta · Site visit recap · 4:30 PM',
      time: '10 min ago',
      unread: true,
    },
    {
      id: '2',
      type: 'chat',
      title: 'New WhatsApp enquiry',
      desc: 'Fatima Khan asked about Shadnagar plots',
      time: '1 hr ago',
      unread: true,
    },
  ],
  YESTERDAY: [
    {
      id: '3',
      type: 'arrow',
      title: 'Stage moved to Offer',
      desc: 'Diya Sharma · by Priya · ₹92L',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: '4',
      type: 'wallet',
      title: 'Payment received ₹1,60,000',
      desc: 'INV-1893 · Rohan Iyer · via UPI',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: '5',
      type: 'person',
      title: 'New team invite accepted',
      desc: 'Sneha joined as Coordinator',
      time: 'Yesterday',
      unread: false,
    },
  ],
};

function NotifIcon({ type }: { type: string }) {
  const isUnread = type === 'alarm' || type === 'chat';
  const bg = isUnread ? colors.accent : colors.bgMuted;
  const c = isUnread ? colors.textInverse : colors.textSecondary;

  let icon;
  switch (type) {
    case 'alarm':
      icon = (
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="13" r="8" stroke={c} strokeWidth={1.75} />
          <Polyline points="12 9 12 13 15 15" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          <Line x1="5" y1="3" x2="2" y2="6" stroke={c} strokeWidth={1.75} strokeLinecap="round" />
          <Line x1="19" y1="3" x2="22" y2="6" stroke={c} strokeWidth={1.75} strokeLinecap="round" />
        </Svg>
      );
      break;
    case 'chat':
      icon = (
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
      break;
    case 'arrow':
      icon = (
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          <Polyline points="12 5 19 12 12 19" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      );
      break;
    case 'wallet':
      icon = (
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="5" width="20" height="14" rx="2" stroke={c} strokeWidth={1.75} />
          <Line x1="2" y1="10" x2="22" y2="10" stroke={c} strokeWidth={1.75} />
        </Svg>
      );
      break;
    case 'person':
      icon = (
        <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
          <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke={c} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
          <Circle cx="9" cy="7" r="4" stroke={c} strokeWidth={1.75} />
          <Line x1="19" y1="8" x2="19" y2="14" stroke={c} strokeWidth={1.75} strokeLinecap="round" />
          <Line x1="22" y1="11" x2="16" y2="11" stroke={c} strokeWidth={1.75} strokeLinecap="round" />
        </Svg>
      );
      break;
    default:
      icon = null;
  }

  return (
    <View style={[styles.notifIcon, { backgroundColor: bg }]}>{icon}</View>
  );
}

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const [todayNotifs, setTodayNotifs] = useState(NOTIFICATIONS.TODAY);

  const unreadCount = todayNotifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setTodayNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
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
          <View style={styles.headerTitleGroup}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <ArrowLeftIcon color={colors.textPrimary} size={20} />
            </TouchableOpacity>
            <View>
              <Text style={styles.title}>Notifications</Text>
              <Text style={styles.subtitle}>
                {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}
              </Text>
            </View>
          </View>
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead} activeOpacity={0.75}>
              <Text style={styles.markAllRead}>Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Today ── */}
        <Text style={styles.groupLabel}>TODAY</Text>
        {todayNotifs.map((n) => (
          <TouchableOpacity
            key={n.id}
            style={[styles.notifCard, n.unread && styles.notifCardUnread]}
            activeOpacity={0.75}
          >
            <NotifIcon type={n.type} />
            <View style={{ flex: 1 }}>
              <Text style={styles.notifTitle}>{n.title}</Text>
              <Text style={styles.notifDesc}>{n.desc}</Text>
              <Text style={[styles.notifTime, n.unread && styles.notifTimeUnread]}>
                {n.time}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* ── Yesterday ── */}
        <Text style={styles.groupLabel}>YESTERDAY</Text>
        <View style={styles.groupCard}>
          {NOTIFICATIONS.YESTERDAY.map((n, i) => (
            <TouchableOpacity
              key={n.id}
              style={[
                styles.groupItem,
                i < NOTIFICATIONS.YESTERDAY.length - 1 && styles.groupItemBorder,
              ]}
              activeOpacity={0.75}
            >
              <NotifIcon type={n.type} />
              <View style={{ flex: 1 }}>
                <Text style={styles.notifTitle}>{n.title}</Text>
                <Text style={styles.notifDesc}>{n.desc}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: layout.screenPaddingH,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.bgSurface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 30, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  markAllRead: { fontFamily: 'Manrope_600SemiBold', fontSize: 13, color: colors.primary, marginTop: 8 },
  groupLabel: { ...textStyles.overline, color: colors.textSecondary, letterSpacing: 1, marginTop: 6 },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  notifCardUnread: {
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
  },
  notifIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
  notifDesc: { ...textStyles.caption, color: colors.textSecondary, marginTop: 3, lineHeight: 18 },
  notifTime: { ...textStyles.caption, color: colors.textSecondary, marginTop: 4, fontSize: 11 },
  notifTimeUnread: { color: colors.accent, fontFamily: 'Manrope_600SemiBold' },
  groupCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  groupItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});

