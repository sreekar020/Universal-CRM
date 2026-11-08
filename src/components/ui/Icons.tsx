// ─────────────────────────────────────────────────────────────
//  Universal CRM — SVG Icon Components (React Native compatible)
//  Uses react-native-svg via Expo. All icons share a consistent
//  stroke weight and visual style.
// ─────────────────────────────────────────────────────────────

import React from 'react';
import Svg, { Path, Circle, Rect, Line, Polyline, G } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
}

function Icon({
  size = 24,
  children,
  viewBox = '0 0 24 24',
}: {
  size: number;
  children: React.ReactNode;
  viewBox?: string;
}) {
  return (
    <Svg width={size} height={size} viewBox={viewBox} fill="none">
      {children}
    </Svg>
  );
}

export function EyeIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="12" r="3" stroke={color} strokeWidth={strokeWidth} />
    </Icon>
  );
}

export function EyeOffIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path
        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Line x1="1" y1="1" x2="23" y2="23" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </Icon>
  );
}

export function UserIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path
        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth={strokeWidth} />
    </Icon>
  );
}

export function MailIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path
        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Polyline
        points="22,6 12,13 2,6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function PhoneIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.9a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 17"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}

export function ChevronRightIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Polyline points="9 18 15 12 9 6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function ArrowLeftIcon({ size = 24, color = '#252A26', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Line x1="19" y1="12" x2="5" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="12 19 5 12 12 5" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function CheckIcon({ size = 24, color = '#FFFEFA', strokeWidth = 2.5 }: IconProps) {
  return (
    <Icon size={size}>
      <Polyline points="20 6 9 17 4 12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function HomeIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Polyline points="9 22 9 12 15 12 15 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function MegaphoneIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path d="m3 11 18-5v12L3 14v-3z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function DumbbellIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path d="m6.5 6.5 11 11" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m21 21-1-1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m3 3 1 1" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m14 6 7 7-4 4-7-7 4-4z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="m3 14 4 4 7-7-4-4-7 7z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function PlaneIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2a.5.5 0 0 0-.3.8l1.5 1.5L11 11l-2 3H7l-1 1 3 2 2 3 1-1v-2l3-2 2.5 7.5a.5.5 0 0 0 .8.3L18 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}

export function GoogleIcon({ size = 24 }: { size?: number }) {
  return (
    <Icon size={size}>
      <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </Icon>
  );
}

export function AlertCircleIcon({ size = 24, color = '#B64E44', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={strokeWidth} />
      <Line x1="12" y1="8" x2="12" y2="12" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <Line x1="12" y1="16" x2="12.01" y2="16" stroke={color} strokeWidth={strokeWidth + 0.5} strokeLinecap="round" />
    </Icon>
  );
}

export function BuildingIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Rect x="4" y="2" width="16" height="20" rx="2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M9 22v-4h6v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M8 6h.01M12 6h.01M16 6h.01M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14h.01" stroke={color} strokeWidth={strokeWidth + 0.25} strokeLinecap="round" />
    </Icon>
  );
}

export function LockIcon({ size = 24, color = '#77786F', strokeWidth = 1.75 }: IconProps) {
  return (
    <Icon size={size}>
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth={strokeWidth} />
      <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </Icon>
  );
}
