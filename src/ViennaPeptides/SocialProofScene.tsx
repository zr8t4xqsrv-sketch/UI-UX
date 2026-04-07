import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Img,
  staticFile,
} from 'remotion';
import { COLORS, FONT, rgba } from './shared';

const TRUST_ITEMS = [
  { label: 'EU Shipping',    icon: '✓', delay: 18 },
  { label: 'Lab Tested',     icon: '✓', delay: 45 },
  { label: 'Research Only',  icon: '✓', delay: 72 },
];

export const SocialProofScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image fades in blurred
  const bgOpacity = interpolate(frame, [0, 20], [0, 0.18], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Heading slides in
  const headingProgress = spring({ frame, fps, config: { damping: 200 } });
  const headingY = interpolate(headingProgress, [0, 1], [-40, 0]);
  const headingOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        fontFamily: FONT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Blurred product image as background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: bgOpacity,
          filter: 'blur(28px)',
        }}
      >
        <Img
          src={staticFile('trio.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Radial dark vignette to keep text readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(13,13,13,0.6) 0%, rgba(13,13,13,0.92) 80%)`,
        }}
      />

      {/* Top gold bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
        }}
      />

      {/* Heading */}
      <div
        style={{
          opacity: headingOpacity,
          transform: `translateY(${headingY}px)`,
          textAlign: 'center',
          marginBottom: 80,
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: COLORS.whiteMid,
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: 8,
            textTransform: 'uppercase',
          }}
        >
          Why choose us
        </div>
        <div
          style={{
            height: 1,
            width: 120,
            background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
            margin: '16px auto 0',
          }}
        />
      </div>

      {/* Trust items */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 36,
          width: '82%',
          zIndex: 2,
        }}
      >
        {TRUST_ITEMS.map((item) => {
          const prog = spring({ frame: frame - item.delay, fps, config: { damping: 200 } });
          const itemX = interpolate(prog, [0, 1], [-600, 0]);
          const itemOpacity = interpolate(
            frame,
            [item.delay, item.delay + 16],
            [0, 1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={item.label}
              style={{
                transform: `translateX(${itemX}px)`,
                opacity: itemOpacity,
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                background: `linear-gradient(135deg, ${rgba.white(0.04)}, ${rgba.white(0.02)})`,
                border: `1px solid ${rgba.gold(0.28)}`,
                borderRadius: 24,
                padding: '28px 44px',
              }}
            >
              {/* Checkmark */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  border: `2px solid ${COLORS.gold}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: `0 0 24px ${rgba.gold(0.35)}`,
                }}
              >
                <span
                  style={{
                    color: COLORS.gold,
                    fontSize: 30,
                    fontWeight: 900,
                    lineHeight: 1,
                  }}
                >
                  {item.icon}
                </span>
              </div>

              {/* Label */}
              <span
                style={{
                  color: COLORS.white,
                  fontSize: 48,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom gold bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
