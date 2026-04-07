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
import { Audio, Video } from '@remotion/media';

// ─── Konstanten ───────────────────────────────────────────────────────────────

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BG = '#0d0d0d';
const SILVER = '#d6d6d6';   // Platinum/Silver – Premium Brand
const WHITE = '#ffffff';
const DIM = '#777777';
const TRANSITION_FRAMES = 15;

// Feste Szenendauern: 75 + 105 + 165 + 150 − 3×15 = 450f (15s @ 30fps)
const HOOK_FRAMES  = 75;
const LAB_FRAMES   = 105;
const BODY_FRAMES  = 165;
const CTA_FRAMES   = 150;

// ─── HOOK ─────────────────────────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textProgress = spring({ frame: frame - 16, fps, config: { damping: 200 } });
  const textOpacity  = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const textY = interpolate(textProgress, [0, 1], [36, 0]);

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Trio fullscreen */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: imgOpacity }}>
        <Img
          src={staticFile('trio.png')}
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
            'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.0) 28%, rgba(0,0,0,0.55) 62%, rgba(0,0,0,0.97) 100%)',
        }}
      />

      {/* Hook Text */}
      <div
        style={{
          position: 'absolute',
          bottom: 160,
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
            fontWeight: 600,
            lineHeight: 1.40,
            letterSpacing: 0.5,
            textShadow: '0 2px 24px rgba(0,0,0,0.95)',
          }}
        >
          Neue Entwicklungen in der Peptidforschung
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── LAB ──────────────────────────────────────────────────────────────────────

const LabScene: React.FC = () => (
  <AbsoluteFill style={{ background: '#000', overflow: 'hidden' }}>
    <Video
      src={staticFile('lab1.mp4')}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      muted
      loop
    />
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.20)',
      }}
    />
  </AbsoluteFill>
);

// ─── BODY ─────────────────────────────────────────────────────────────────────

const FEATURES = [
  { label: 'High purity peptides', startOffset: 0.08 },
  { label: 'EU Shipping',          startOffset: 0.40 },
  { label: 'Lab focus',            startOffset: 0.72 },
];

const BodyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const imgOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const labelProgress = spring({ frame: frame - 8, fps, config: { damping: 200 } });
  const labelOpacity  = interpolate(frame, [8, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelY = interpolate(labelProgress, [0, 1], [-20, 0]);

  const dividerWidth = interpolate(frame, [14, 42], [0, 90], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, overflow: 'hidden' }}>
      {/* Trio contained */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', opacity: imgOpacity }}>
        <Img
          src={staticFile('trio.png')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scale(${imgScale})`,
            transformOrigin: 'center 42%',
          }}
        />
      </div>

      {/* Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,13,13,0.94) 0%, rgba(13,13,13,0.0) 18%, rgba(13,13,13,0.0) 54%, rgba(13,13,13,0.97) 76%)',
        }}
      />

      {/* Brand label oben */}
      <div
        style={{
          position: 'absolute',
          top: 112,
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
            color: SILVER,
            fontSize: 28,
            fontWeight: 400,
            letterSpacing: 12,
            textTransform: 'uppercase',
          }}
        >
          Vienna Peptides
        </div>
        <div
          style={{
            height: 1,
            width: dividerWidth,
            background: `linear-gradient(to right, transparent, ${SILVER}, transparent)`,
            margin: '16px auto 0',
          }}
        />
      </div>

      {/* Feature-Tags gestaffelt */}
      <div
        style={{
          position: 'absolute',
          bottom: 110,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          zIndex: 2,
        }}
      >
        {FEATURES.map((feat, i) => {
          const startFrame = Math.round(feat.startOffset * durationInFrames);
          const prog = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
          const op   = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(prog, [0, 1], [22, 0]);

          return (
            <div
              key={i}
              style={{
                opacity: op,
                transform: `translateY(${y}px)`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              {/* Kleiner Silver-Strich links */}
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: SILVER,
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  color: i === 0 ? WHITE : DIM,
                  fontSize: i === 0 ? 40 : 36,
                  fontWeight: i === 0 ? 500 : 400,
                  letterSpacing: 1.5,
                  textShadow: '0 2px 12px rgba(0,0,0,0.80)',
                }}
              >
                {feat.label}
              </div>
              <div
                style={{
                  width: 24,
                  height: 1,
                  background: SILVER,
                  opacity: 0.6,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────

const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoScale    = interpolate(logoProgress, [0, 1], [0.72, 1]);
  const logoOpacity  = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [22, 52], [0, 68], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlProgress = spring({ frame: frame - 32, fps, config: { damping: 200 } });
  const urlY        = interpolate(urlProgress, [0, 1], [34, 0]);
  const urlOpacity  = interpolate(frame, [32, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const taglineOpacity = interpolate(frame, [60, 78], [0, 0.5], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGlow = 0.04 + Math.sin(frame * 0.06) * 0.012;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 44%, #141414 0%, ${BG} 100%)`,
        fontFamily: FONT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Silver Halo */}
      <div
        style={{
          position: 'absolute',
          width: 580,
          height: 580,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(214,214,214,${bgGlow}) 0%, transparent 60%)`,
        }}
      />

      {/* Logo */}
      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, zIndex: 2 }}>
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 320,
            height: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 20px rgba(255,255,255,0.12))`,
          }}
        />
      </div>

      {/* Divider */}
      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          background: `linear-gradient(to right, transparent, ${SILVER}, transparent)`,
          margin: '52px 0 44px',
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
            fontSize: 36,
            fontWeight: 400,
            letterSpacing: 2,
          }}
        >
          viennapeptides.com
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: 'absolute',
          bottom: 90,
          opacity: taglineOpacity,
          color: DIM,
          fontSize: 20,
          letterSpacing: 8,
          textTransform: 'uppercase',
          zIndex: 2,
        }}
      >
        Peptide Research
      </div>
    </AbsoluteFill>
  );
};

// ─── KOMPOSITION ──────────────────────────────────────────────────────────────
// 75 + 105 + 165 + 150 − 3 × 15 = 450f (15s @ 30fps)

export const ViennaPeptidesV2: React.FC = () => (
  <AbsoluteFill>
    {/* Voiceover startet bei Frame 0, läuft bis Ende */}
    <Audio src={staticFile('trio-voice.mp3')} />

    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={HOOK_FRAMES}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={LAB_FRAMES}>
        <LabScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={BODY_FRAMES}>
        <BodyScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={CTA_FRAMES}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
