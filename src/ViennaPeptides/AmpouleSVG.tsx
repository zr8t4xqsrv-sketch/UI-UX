import React from 'react';
import { COLORS, rgba } from './shared';

// SVG viewBox: 120 × 280
// Tip at (60,8), body y=116–228, bottom curve to y=268
const PATH =
  'M 60 8 L 54 36 Q 44 52 40 70 L 36 88 Q 22 100 22 118 L 22 228 Q 22 265 60 268 Q 98 265 98 228 L 98 118 Q 98 100 84 88 L 80 70 Q 76 52 66 36 Z';

interface Props {
  liquidFill: number;      // 0–1
  liquidColor?: string;
  glowColor?: string;
  size?: number;
  uid: string;             // unique per instance – avoids SVG id collisions
}

export const AmpouleSVG: React.FC<Props> = ({
  liquidFill,
  liquidColor = COLORS.green,
  glowColor = COLORS.gold,
  size = 160,
  uid,
}) => {
  const h = size * (280 / 120);
  // liquid fills from bottom (y=268) upward; full range = 260 px
  const liquidTopY = 268 - liquidFill * 260;

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 120 280"
      style={{ filter: `drop-shadow(0 0 14px ${glowColor}99) drop-shadow(0 0 32px ${glowColor}44)` }}
    >
      <defs>
        <linearGradient id={`liq-${uid}`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={liquidColor} stopOpacity={1} />
          <stop offset="100%" stopColor={liquidColor} stopOpacity={0.65} />
        </linearGradient>
        <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.03)" />
          <stop offset="35%"  stopColor="rgba(255,255,255,0.13)" />
          <stop offset="65%"  stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <rect x="0" y={liquidTopY} width="120" height={280 - liquidTopY} />
        </clipPath>
      </defs>

      {/* glass shell */}
      <path d={PATH} fill={rgba.white(0.05)} stroke={`${glowColor}99`} strokeWidth="1.8" />

      {/* liquid */}
      <path d={PATH} fill={`url(#liq-${uid})`} clipPath={`url(#clip-${uid})`} />

      {/* glass shine */}
      <path d={PATH} fill={`url(#glass-${uid})`} />

      {/* left-edge highlight */}
      <path
        d="M 47 16 L 43 42 Q 37 54 34 72 L 31 90 Q 28 98 28 112"
        stroke="rgba(255,255,255,0.32)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* liquid surface shimmer */}
      {liquidFill > 0.02 && (
        <ellipse
          cx={60}
          cy={Math.max(liquidTopY + 3, 18)}
          rx={18}
          ry={2.5}
          fill="rgba(255,255,255,0.22)"
        />
      )}
    </svg>
  );
};
