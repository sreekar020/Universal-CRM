// ─────────────────────────────────────────────────────────────
//  Universal CRM — Sage & Terracotta Color System
//  All raw hex values live here. Components import from theme/index.
// ─────────────────────────────────────────────────────────────

export const palette = {
  // Base
  background: '#F6F3EB',
  surface: '#FFFEFA',
  surfaceMuted: '#E8EDE4',

  // Brand
  primary: '#244238',
  primaryDark: '#1A3029',
  primaryLight: '#2E5447',

  // Accents
  accent: '#C66A4A',
  accentSecondary: '#D8AF62',

  // Neutrals
  secondary: '#87947A',
  border: '#E3DED3',
  borderFocus: '#244238',

  // Text
  textPrimary: '#252A26',
  textSecondary: '#77786F',
  textDisabled: '#B0B3AA',
  textInverse: '#FFFEFA',

  // Semantic
  error: '#B64E44',
  errorLight: '#F9ECEB',
  success: '#47765B',
  successLight: '#EAF4EE',
  warning: '#C68A2A',
  warningLight: '#FBF3E2',

  // Overlays
  overlay: 'rgba(36, 66, 56, 0.08)',
  overlayDark: 'rgba(36, 66, 56, 0.16)',

  // Misc
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export type PaletteKey = keyof typeof palette;

// Semantic aliases — use these in components
export const colors = {
  // Backgrounds
  bg: palette.background,
  bgSurface: palette.surface,
  bgMuted: palette.surfaceMuted,
  bgPrimary: palette.primary,

  // Text
  textPrimary: palette.textPrimary,
  textSecondary: palette.textSecondary,
  textDisabled: palette.textDisabled,
  textInverse: palette.textInverse,
  textAccent: palette.accent,
  textLink: palette.primary,
  textError: palette.error,
  textSuccess: palette.success,

  // Brand
  primary: palette.primary,
  primaryDark: palette.primaryDark,
  primaryLight: palette.primaryLight,
  accent: palette.accent,
  accentSecondary: palette.accentSecondary,
  secondary: palette.secondary,

  // Borders
  border: palette.border,
  borderFocus: palette.borderFocus,
  borderError: palette.error,

  // Controls
  inputBg: palette.surface,
  inputBorder: palette.border,
  inputBorderFocus: palette.primary,
  inputBorderError: palette.error,
  inputText: palette.textPrimary,
  inputPlaceholder: palette.textSecondary,

  // Buttons
  btnPrimaryBg: palette.primary,
  btnPrimaryText: palette.textInverse,
  btnPrimaryBgDisabled: palette.secondary,
  btnSecondaryBg: palette.surface,
  btnSecondaryBorder: palette.border,
  btnSecondaryText: palette.textPrimary,

  // States
  error: palette.error,
  errorBg: palette.errorLight,
  success: palette.success,
  successBg: palette.successLight,
  warning: palette.warning,
  warningBg: palette.warningLight,
  overlay: palette.overlay,

  // Niche cards
  nicheIconBg: palette.surfaceMuted,
  nicheSelectedBorder: palette.primary,
  nicheSelectedIndicator: palette.accent,

  // Dividers
  divider: palette.border,
} as const;

export type ColorKey = keyof typeof colors;
