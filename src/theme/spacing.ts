// ─────────────────────────────────────────────────────────────
//  Universal CRM — Spacing System
//  Base unit: 8px
// ─────────────────────────────────────────────────────────────

export const spacing = {
  0: 0,
  0.5: 4,
  1: 8,
  1.5: 12,
  2: 16,
  2.5: 20,
  3: 24,
  3.5: 28,
  4: 32,
  5: 40,
  6: 48,
  7: 56,
  8: 64,
  10: 80,
  12: 96,
  16: 128,
} as const;

// Semantic spacing aliases
export const layout = {
  // Screen horizontal padding (20–24px)
  screenPaddingH: spacing[2.5],
  screenPaddingV: spacing[2],

  // Input and control sizing
  inputHeight: 52,
  inputPaddingH: spacing[2],
  inputPaddingV: spacing[1.5],

  // Buttons
  btnHeightPrimary: 54,
  btnHeightSecondary: 50,
  btnPaddingH: spacing[3],

  // Cards
  cardPadding: spacing[2],
  cardPaddingLg: spacing[2.5],

  // Section spacing
  sectionGap: spacing[3],
  itemGap: spacing[1.5],
  formFieldGap: spacing[2],

  // Icon sizes
  iconSm: 16,
  iconMd: 20,
  iconLg: 24,
  iconXl: 32,
} as const;

export type SpacingKey = keyof typeof spacing;
