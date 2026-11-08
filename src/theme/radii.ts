// ─────────────────────────────────────────────────────────────
//  Universal CRM — Border Radii
// ─────────────────────────────────────────────────────────────

export const radii = {
  none: 0,
  sm: 6,
  md: 10,
  lg: 14,
  xl: 16,
  '2xl': 20,
  '3xl': 28,
  full: 9999,
} as const;

// Semantic radius aliases
export const radius = {
  sm: radii.sm,
  md: radii.md,
  lg: radii.lg,
  input: radii.md,
  button: radii.md,
  card: radii.lg,
  cardLg: radii.xl,
  sheet: radii['2xl'],
  chip: radii.full,
  badge: radii.full,
  avatar: radii.full,
  icon: radii.md,
} as const;

export type RadiusKey = keyof typeof radii;
