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

const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r},${g},${b},${a})`;

// ─── HOOK (69 frames ≈ 2.3s) ─────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 69], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textProgress = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const textOpacity = interpolate(frame, [14, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textProgress, [0, 1], [48, 0]);

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Fullscreen product image – slow Ken-Burns */}
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

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.70) 68%, rgba(0,0,0,0.96) 100%)',
        }}
      />

      {/* Hook text */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 60,
          right: 60,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <div
          style={{
            color: WHITE,
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.38,
            textShadow: '0 2px 28px rgba(0,0,0,0.95)',
          }}
        >
          "Warum sprechen plötzlich alle über GHK-Cu?"
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── BODY (219 frames ≈ 7.3s) ────────────────────────────────────────────────

const BODY_LINES = [
  { text: 'GHK-Cu ist ein Kupfer-Peptid',                        frame: 16 },
  { text: 'wird in Studien zur Hautregeneration\nuntersucht',    frame: 72 },
  { text: 'steht im Fokus bei\nKollagen & Repair-Prozessen',     frame: 130 },
];

const BodyLine: React.FC<{
  text: string;
  startFrame: number;
  index: number;
  currentFrame: number;
  fps: number;
}> = ({ text, startFrame, index, currentFrame, fps }) => {
  const progress = spring({ frame: currentFrame - startFrame, fps, config: { damping: 200 } });
  const opacity = interpolate(currentFrame, [startFrame, startFrame + 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = interpolate(progress, [0, 1], [28, 0]);

  // Divider line grows when line appears
  const dividerWidth = interpolate(
    currentFrame,
    [startFrame + 16, startFrame + 36],
    [0, 36],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const isFirst = index === 0;

  return (
    <div style={{ opacity, transform: `translateY(${y}px)` }}>
      {/* Divider before lines 2 & 3 */}
      {!isFirst && (
        <div
          style={{
            height: 1,
            width: dividerWidth,
            background: `linear-gradient(to right, ${GOLD}, transparent)`,
            marginBottom: 20,
          }}
        />
      )}
      <div
        style={{
          color: isFirst ? WHITE : MUTED,
          fontSize: isFirst ? 44 : 38,
          fontWeight: isFirst ? 700 : 400,
          lineHeight: 1.45,
          letterSpacing: isFirst ? 0 : 0.5,
          textShadow: '0 2px 16px rgba(0,0,0,0.85)',
          whiteSpace: 'pre-line',
        }}
      >
        {text}
      </div>
    </div>
  );
};

const BodyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imgScale = interpolate(frame, [0, 219], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // "GHK-Cu" title slides down from top
  const titleProgress = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const titleOpacity = interpolate(frame, [8, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleY = interpolate(titleProgress, [0, 1], [-32, 0]);

  return (
    <AbsoluteFill style={{ background: BG_DARK, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Product – contained so product is fully in frame */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: imgOpacity }}>
        <Img
          src={staticFile('ghkcu.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scale(${imgScale})`,
            transformOrigin: 'center 40%',
          }}
        />
      </div>

      {/* Gradient: dark top & bottom, clear window for product */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,13,13,0.90) 0%, rgba(13,13,13,0.0) 20%, rgba(13,13,13,0.0) 54%, rgba(13,13,13,0.96) 78%)',
        }}
      />

      {/* "GHK-Cu" – top label */}
      <div
        style={{
          position: 'absolute',
          top: 100,
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
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: 10,
            textShadow: `0 0 40px ${rgba(212, 175, 55, 0.5)}`,
          }}
        >
          GHK-Cu
        </div>
        <div
          style={{
            height: 1,
            width: interpolate(frame, [14, 40], [0, 120], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            margin: '14px auto 0',
          }}
        />
      </div>

      {/* Staggered body lines – bottom third */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 68,
          right: 68,
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
          zIndex: 2,
        }}
      >
        {BODY_LINES.map((line, i) => (
          <BodyLine
            key={i}
            text={line.text}
            startFrame={line.frame}
            index={i}
            currentFrame={frame}
            fps={fps}
          />
        ))}
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
  const urlY = interpolate(urlProgress, [0, 1], [40, 0]);
  const urlOpacity = interpolate(frame, [26, 44], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const researchOpacity = interpolate(frame, [55, 72], [0, 0.48], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGlow = 0.055 + Math.sin(frame * 0.07) * 0.022;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 46%, #181818 0%, ${BG_DARK} 100%)`,
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
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${rgba(212, 175, 55, bgGlow)} 0%, transparent 60%)`,
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
            filter: `drop-shadow(0 0 26px ${rgba(212, 175, 55, 0.42)})`,
          }}
        />
      </div>

      {/* Gold divider */}
      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          margin: '50px 0 42px',
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
// Hook 69f + Body 219f + CTA 180f − 2 × 9f = 450f (15s @ 30fps)

export const GHKCuAd2: React.FC = () => (
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
