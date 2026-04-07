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

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product image: slow Ken-Burns zoom
  const imgScale = interpolate(frame, [0, 99], [1.0, 1.1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "Verified Quality" slides up
  const textProgress = spring({ frame: frame - 28, fps, config: { damping: 200 } });
  const textOpacity = interpolate(frame, [28, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textProgress, [0, 1], [50, 0]);

  // Gold underline grows
  const underlineWidth = interpolate(frame, [42, 68], [0, 260], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Top tag fades in
  const tagOpacity = interpolate(frame, [55, 75], [0, 0.75], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle radial glow pulse
  const glowOpacity = 0.12 + Math.sin(frame * 0.09) * 0.04;

  return (
    <AbsoluteFill style={{ background: COLORS.bgDark, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Product image – full bleed with slow zoom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          opacity: imgOpacity,
        }}
      >
        <Img
          src={staticFile('ghkcu.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${imgScale})`,
            transformOrigin: 'center 40%',
          }}
        />
      </div>

      {/* Dark gradient overlay – bottom heavy so text is readable */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.65) 75%, rgba(0,0,0,0.88) 100%)',
        }}
      />

      {/* Radial gold glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 38%, ${rgba.gold(glowOpacity)} 0%, transparent 55%)`,
        }}
      />

      {/* Top brand tag */}
      <div
        style={{
          position: 'absolute',
          top: 90,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: tagOpacity,
          color: COLORS.gold,
          fontSize: 24,
          fontWeight: 400,
          letterSpacing: 9,
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        Vienna Peptides
      </div>

      {/* "Verified Quality" */}
      <div
        style={{
          position: 'absolute',
          bottom: 180,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: COLORS.white,
            fontSize: 70,
            fontWeight: 800,
            letterSpacing: 5,
            textTransform: 'uppercase',
            textShadow: '0 4px 28px rgba(0,0,0,0.9)',
            lineHeight: 1.1,
          }}
        >
          Verified
        </div>
        <div
          style={{
            color: COLORS.gold,
            fontSize: 70,
            fontWeight: 800,
            letterSpacing: 5,
            textTransform: 'uppercase',
            textShadow: `0 4px 28px rgba(0,0,0,0.9), 0 0 40px ${rgba.gold(0.5)}`,
            lineHeight: 1.1,
          }}
        >
          Quality
        </div>

        {/* Gold underline */}
        <div
          style={{
            height: 2,
            width: underlineWidth,
            background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
            margin: '20px auto 0',
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
