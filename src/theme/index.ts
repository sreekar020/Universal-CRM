// ─────────────────────────────────────────────────────────────
//  Universal CRM — Theme barrel export
// ─────────────────────────────────────────────────────────────

export { colors, palette } from './colors';
export type { ColorKey, PaletteKey } from './colors';

export { fontFamily, fontSize, lineHeight, letterSpacing, textStyles } from './typography';
export type { TextStyleKey } from './typography';

export { spacing, layout } from './spacing';
export type { SpacingKey } from './spacing';

export { radii, radius } from './radii';
export type { RadiusKey } from './radii';

// Brand constants
export const BRAND = {
  name: 'UnivCRM',
  tagline: 'FOR BUSINESS',
  descriptor: 'One calm workspace for leads, follow-ups, deals and your team.',
} as const;
