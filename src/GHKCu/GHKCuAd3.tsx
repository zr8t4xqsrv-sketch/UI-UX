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
const BG = '#111111';
const GOLD = '#d4af37';
const WHITE = '#f2f2f2';
const DIM = '#999999';

// ─── HOOK (69 frames ≈ 2.3s) ─────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 69], [1.0, 1.07], {
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
  const textY = interpolate(textProgress, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, overflow: 'hidden' }}>
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

      {/* Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 32%, rgba(0,0,0,0.68) 65%, rgba(0,0,0,0.97) 100%)',
        }}
      />

      {/* Hook text */}
      <div
        style={{
          position: 'absolute',
          bottom: 148,
          left: 56,
          right: 56,
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
            lineHeight: 1.38,
            textShadow: '0 2px 24px rgba(0,0,0,0.95)',
          }}
        >
          "Warum wirkt GHK-Cu so interessant?"
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── BODY (219 frames ≈ 7.3s) ────────────────────────────────────────────────

const LINES = [
  { text: 'GHK-Cu wird in Studien untersucht',                  startFrame: 14 },
  { text: 'vor allem im Bereich\nHaut & Regeneration',          startFrame: 74 },
  { text: 'immer mehr Interesse\nin der Forschung',             startFrame: 138 },
];

const BodyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 219], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Top label
  const labelProgress = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  const labelOpacity = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(labelProgress, [0, 1], [-28, 0]);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Product – contained so full product is visible */}
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

      {/* Gradient window: dark top + dark bottom, clear middle for product */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(17,17,17,0.92) 0%, rgba(17,17,17,0.0) 20%, rgba(17,17,17,0.0) 56%, rgba(17,17,17,0.97) 80%)',
        }}
      />

      {/* Top: "GHK-Cu" */}
      <div
        style={{
          position: 'absolute',
          top: 108,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: GOLD,
            fontSize: 78,
            fontWeight: 800,
            letterSpacing: 10,
            textShadow: `0 0 36px rgba(212,175,55,0.48)`,
          }}
        >
          GHK-Cu
        </div>
        {/* Divider under heading */}
        <div
          style={{
            height: 1,
            width: interpolate(frame, [12, 38], [0, 110], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            margin: '12px auto 0',
          }}
        />
      </div>

      {/* Bottom: staggered lines */}
      <div
        style={{
          position: 'absolute',
          bottom: 96,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
          zIndex: 2,
        }}
      >
        {LINES.map((line, i) => {
          const prog = spring({ frame: frame - line.startFrame, fps, config: { damping: 200 } });
          const op = interpolate(frame, [line.startFrame, line.startFrame + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(prog, [0, 1], [30, 0]);

          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)` }}>
              {/* Small gold dot prefix */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: GOLD,
                    flexShrink: 0,
                    marginTop: 14,
                    boxShadow: `0 0 10px rgba(212,175,55,0.6)`,
                  }}
                />
                <div
                  style={{
                    color: i === 0 ? WHITE : DIM,
                    fontSize: i === 0 ? 42 : 38,
                    fontWeight: i === 0 ? 600 : 400,
                    lineHeight: 1.45,
                    letterSpacing: 0.3,
                    textShadow: '0 2px 14px rgba(0,0,0,0.85)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {line.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA (180 frames = 6s) ───────────────────────────────────────────────────

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
  const urlY = interpolate(urlProgress, [0, 1], [38, 0]);
  const urlOpacity = interpolate(frame, [26, 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const researchOpacity = interpolate(frame, [54, 70], [0, 0.46], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGlow = 0.055 + Math.sin(frame * 0.07) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 46%, #181818 0%, ${BG} 100%)`,
        fontFamily: FONT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Gold halo */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212,175,55,${bgGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* Logo */}
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, zIndex: 2 }}>
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 300,
            height: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 24px rgba(212,175,55,0.4))`,
          }}
        />
      </div>

      {/* Divider */}
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
        <div style={{ color: WHITE, fontSize: 38, fontWeight: 500, letterSpacing: 1 }}>
          viennapeptides.com
        </div>
      </div>

      {/* Research Only */}
      <div
        style={{
          position: 'absolute',
          bottom: 88,
          opacity: researchOpacity,
          color: DIM,
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
// Hook 69f + Body 219f + CTA 180f − 2 × 9f = 450f (15s @ 30fps)

export const GHKCuAd3: React.FC = () => (
  <AbsoluteFill>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={69}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />

      <TransitionSeries.Sequence durationInFrames={219}>
        <BodyScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 9 })}
      />

      <TransitionSeries.Sequence durationInFrames={180}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
