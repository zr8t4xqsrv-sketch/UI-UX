import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BG_DARK = '#0d0d0d';
const GOLD = '#d4af37';
const WHITE = '#f0f0f0';
const MUTED = '#888888';

// ─── HOOK (69 frames = 2.3s) ─────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 69], [1.0, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textProgress = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const textOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textProgress, [0, 1], [44, 0]);

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: 'hidden' }}>
      {/* GHK-Cu fullscreen, slow Ken-Burns */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: imgOpacity }}>
        <Img
          src={staticFile('ghkcu.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${imgScale})`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Dark gradient – bottom heavy for text legibility */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 38%, rgba(0,0,0,0.75) 72%, rgba(0,0,0,0.95) 100%)',
        }}
      />

      {/* Question text */}
      <div
        style={{
          position: 'absolute',
          bottom: 150,
          left: 64,
          right: 64,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.35,
            textShadow: '0 2px 24px rgba(0,0,0,0.9)',
          }}
        >
          "Warum sieht meine Haut plötzlich besser aus?"
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── BODY (189 frames = 6.3s) ────────────────────────────────────────────────

const BodyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 189], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "GHK-Cu" heading drops in from top
  const titleProgress = spring({ frame: frame - 10, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(frame, [10, 26], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleProgress, [0, 1], [-36, 0]);

  // Body lines staggered
  const line1Progress = spring({ frame: frame - 36, fps, config: { damping: 200 } });
  const line1Opacity = interpolate(frame, [36, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line1Y = interpolate(line1Progress, [0, 1], [32, 0]);

  const line2Progress = spring({ frame: frame - 60, fps, config: { damping: 200 } });
  const line2Opacity = interpolate(frame, [60, 76], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const line2Y = interpolate(line2Progress, [0, 1], [32, 0]);

  // Gold line accent width
  const accentWidth = interpolate(frame, [62, 86], [0, 48], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Product – objectFit:contain so product is fully visible */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: imgOpacity }}>
        <Img
          src={staticFile('ghkcu.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scale(${imgScale})`,
            transformOrigin: 'center 42%',
          }}
        />
      </div>

      {/* Gradient: heavy top + heavy bottom, transparent in middle → product visible */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.0) 22%, rgba(13,13,13,0.0) 62%, rgba(13,13,13,0.92) 85%)',
        }}
      />

      {/* Heading: "GHK-Cu" */}
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: GOLD,
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: 10,
            textShadow: `0 0 44px rgba(212,175,55,0.55)`,
          }}
        >
          GHK-Cu
        </div>
      </div>

      {/* Body text block – bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 120,
          left: 72,
          right: 72,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
          zIndex: 2,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `translateY(${line1Y}px)`,
            color: WHITE,
            fontSize: 44,
            fontWeight: 600,
            letterSpacing: 1,
            textShadow: '0 2px 16px rgba(0,0,0,0.85)',
          }}
        >
          Beliebt in der Forschung
        </div>

        {/* Line 2 with gold accent */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              height: 1,
              width: accentWidth,
              background: GOLD,
              flexShrink: 0,
            }}
          />
          <div
            style={{
              color: MUTED,
              fontSize: 36,
              fontWeight: 400,
              letterSpacing: 2,
              textShadow: '0 2px 12px rgba(0,0,0,0.7)',
            }}
          >
            Fokus: Regeneration
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA (210 frames = 7s) ───────────────────────────────────────────────────

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.65, 1]);
  const logoOpacity = interpolate(frame, [0, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [18, 46], [0, 72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlProgress = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const urlY = interpolate(urlProgress, [0, 1], [42, 0]);
  const urlOpacity = interpolate(frame, [26, 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const researchOpacity = interpolate(frame, [55, 72], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGlow = 0.06 + Math.sin(frame * 0.07) * 0.025;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 46%, #191919 0%, ${BG_DARK} 100%)`,
        fontFamily: FONT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Subtle gold radial halo */}
      <div
        style={{
          position: 'absolute',
          width: 640,
          height: 640,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212,175,55,${bgGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          zIndex: 2,
        }}
      >
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 300,
            height: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 28px rgba(212,175,55,0.45))`,
          }}
        />
      </div>

      {/* Gold divider */}
      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          margin: '48px 0 40px',
          zIndex: 2,
        }}
      />

      {/* URL */}
      <div
        style={{
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 38,
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          viennapeptides.com
        </div>
      </div>

      {/* Research Only */}
      <div
        style={{
          position: 'absolute',
          bottom: 88,
          opacity: researchOpacity,
          color: MUTED,
          fontSize: 22,
          letterSpacing: 6,
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        Research Only
      </div>
    </AbsoluteFill>
  );
};

// ─── COMPOSITION ─────────────────────────────────────────────────────────────
// Hook 69f + Body 189f + CTA 210f − 2 × 9f transitions = 450f (15s @ 30fps)

export const GHKCuAd: React.FC = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={69}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />

      <TransitionSeries.Sequence durationInFrames={189}>
        <BodyScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />

      <TransitionSeries.Sequence durationInFrames={210}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
