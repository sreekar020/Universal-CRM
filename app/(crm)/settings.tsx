// ─────────────────────────────────────────────────────────────
//  Universal CRM — More & Settings Screen (Screen 18)
//  User profile, WhatsApp toggle, menu items, logout
// ─────────────────────────────────────────────────────────────

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Polyline, Line, Rect } from 'react-native-svg';
import { colors, textStyles, layout, radius } from '../../src/theme';
import { useAppStore } from '../../src/store/appStore';
import TabBar from '../../src/components/ui/TabBar';

function ChevronRightIcon({ color = '#252A26', size = 16 }: { color?: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Polyline points="9 18 15 12 9 6" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PeopleIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth={1.75} />
      <Path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M16 3.13a4 4 0 0 1 0 7.75" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DocIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="14 2 14 8 20 8" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ShieldIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BellIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PipelineIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="4" height="18" rx="1" stroke={color} strokeWidth={1.75} />
      <Rect x="10" y="8" width="4" height="13" rx="1" stroke={color} strokeWidth={1.75} />
      <Rect x="17" y="13" width="4" height="8" rx="1" stroke={color} strokeWidth={1.75} />
    </Svg>
  );
}

function GlobeIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.75} />
      <Line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HelpIcon({ size = 18, color = '#252A26' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={1.75} />
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="12" y1="17" x2="12.01" y2="17" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function ChatIcon({ size = 20, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LogOutIcon({ size = 18, color = colors.error }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="16 17 21 12 16 7" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      <Line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
    </Svg>
  );
}

const MENU_ITEMS = [
  { icon: (c: string) => <PeopleIcon color={c} />, label: 'Contacts', meta: '86 people', route: '/(crm)/contacts' },
  { icon: (c: string) => <DocIcon color={c} />, label: 'Quotes & Invoices', meta: '₹4.8L receivable', route: '/(crm)/quotes' },
  { icon: (c: string) => <ShieldIcon color={c} />, label: 'Team', meta: '5 members', route: '/(crm)/team' },
  { icon: (c: string) => <BellIcon color={c} />, label: 'Notifications', meta: '3 unread', route: '/(crm)/notifications' },
  { icon: (c: string) => <PipelineIcon color={c} />, label: 'Pipeline stages', meta: '6 stages', route: '/(crm)/pipeline' },
  { icon: (c: string) => <GlobeIcon color={c} />, label: 'Language', meta: 'English', route: null },
  { icon: (c: string) => <HelpIcon color={c} />, label: 'Help & Support', meta: 'Chat with us', route: null },
];

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const logout = useAppStore((s) => s.logout);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          styles.scroll,
          { paddingTop: insets.top + 16, paddingBottom: 32 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View>
          <Text style={styles.title}>More & Settings</Text>
          <Text style={styles.subtitle}>UrbanNest Realty</Text>
        </View>

        {/* ── Profile Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>SR</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Sreekar Reddy</Text>
            <Text style={styles.profileRole}>Owner · sreekar@urbannest.in</Text>
          </View>
          <View style={styles.nichePill}>
            <Text style={styles.nichePillText}>Real Estate</Text>
          </View>
        </View>

        {/* ── WhatsApp Row ── */}
        <View style={styles.whatsappCard}>
          <View style={styles.whatsappIconWrap}>
            <ChatIcon size={20} color={colors.textInverse} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.whatsappTitle}>WhatsApp connected</Text>
            <Text style={styles.whatsappSub}>+91 98480 12345 · 128 chats synced</Text>
          </View>
          <Switch
            value={whatsappEnabled}
            onValueChange={setWhatsappEnabled}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={colors.bgSurface}
          />
        </View>

        {/* ── Menu Items ── */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, i) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                i < MENU_ITEMS.length - 1 && styles.menuItemBorder,
              ]}
              activeOpacity={0.75}
              onPress={() => item.route && router.push(item.route as any)}
            >
              <View style={styles.menuIconWrap}>
                {item.icon(colors.textSecondary)}
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuMeta}>{item.meta}</Text>
              <ChevronRightIcon color={colors.textSecondary} size={15} />
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          activeOpacity={0.85}
          onPress={logout}
        >
          <LogOutIcon size={18} color={colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {/* ── Version ── */}
        <Text style={styles.version}>UnivCRM v1.0 · Made for Indian SMBs</Text>
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
  title: { fontFamily: 'Manrope_800ExtraBold', fontSize: 28, color: colors.textPrimary, letterSpacing: -0.5 },
  subtitle: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: colors.textInverse },
  profileName: { fontFamily: 'Manrope_700Bold', fontSize: 16, color: colors.textPrimary },
  profileRole: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  nichePill: {
    backgroundColor: colors.bgMuted,
    borderRadius: radius.chip,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  nichePillText: { fontFamily: 'Manrope_600SemiBold', fontSize: 12, color: colors.textSecondary },
  whatsappCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.bgMuted,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  whatsappIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whatsappTitle: { fontFamily: 'Manrope_700Bold', fontSize: 14, color: colors.textPrimary },
  whatsappSub: { ...textStyles.caption, color: colors.textSecondary, marginTop: 2 },
  menuCard: {
    backgroundColor: colors.bgSurface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.bgMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { fontFamily: 'Manrope_600SemiBold', fontSize: 15, color: colors.textPrimary, flex: 1 },
  menuMeta: { ...textStyles.caption, color: colors.textSecondary, fontSize: 12 },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.bgSurface,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.error,
    paddingVertical: 15,
    marginTop: 4,
  },
  logoutText: { fontFamily: 'Manrope_700Bold', fontSize: 15, color: colors.error },
  version: { ...textStyles.caption, color: colors.textSecondary, textAlign: 'center', fontSize: 11 },
});

