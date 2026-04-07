import React from 'react';
import {
  AbsoluteFill,
  CalculateMetadataFunction,
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
import { Input, ALL_FORMATS, UrlSource } from 'mediabunny';

// ─── Konstanten ───────────────────────────────────────────────────────────────

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const BG = '#1a1a1a';
const GOLD = '#d4af37';
const WHITE = '#f2f2f2';
const DIM = '#999999';
const FPS = 30;
const TRANSITION_FRAMES = 15; // Dauer jedes Übergangs in Frames
const NUM_TRANSITIONS = 3;    // Hook→Lab, Lab→Body, Body→CTA

// Proportionen der Szenen (bezogen auf Zielstruktur: 2s Hook, 3s Lab, 5s Body, 5s CTA)
const RATIOS = {
  hook: 2 / 15,
  lab:  3 / 15,
  body: 5 / 15,
  cta:  5 / 15,
} as const;

// ─── Props ────────────────────────────────────────────────────────────────────

export type GHKCuAdLabProps = {
  hookFrames: number;
  labFrames:  number;
  bodyFrames: number;
  ctaFrames:  number;
};

export const defaultProps: GHKCuAdLabProps = {
  hookFrames: 60,
  labFrames:  90,
  bodyFrames: 150,
  ctaFrames:  150,
};

// ─── calculateMetadata ────────────────────────────────────────────────────────
// Misst die Audiodauer und verteilt die Szenenzeiten proportional

export const calculateMetadata: CalculateMetadataFunction<GHKCuAdLabProps> = async () => {
  const src = staticFile('ghkcu-voice.mp3');

  try {
    const input = new Input({
      formats: ALL_FORMATS,
      source: new UrlSource(src, { getRetryDelay: () => null }),
    });
    const audioDurationSec = await input.computeDuration();
    const totalFrames = Math.ceil(audioDurationSec * FPS);

    // Szenen-Frames = Gesamtframes + Übergangs-Overlaps
    const scenePool = totalFrames + NUM_TRANSITIONS * TRANSITION_FRAMES;

    const hookFrames  = Math.round(RATIOS.hook * scenePool);
    const labFrames   = Math.round(RATIOS.lab  * scenePool);
    const bodyFrames  = Math.round(RATIOS.body * scenePool);
    const ctaFrames   = scenePool - hookFrames - labFrames - bodyFrames;

    return {
      durationInFrames: totalFrames,
      props: { hookFrames, labFrames, bodyFrames, ctaFrames },
    };
  } catch {
    // Fallback auf fixe 15s wenn Datei beim Laden nicht erreichbar ist
    return {
      durationInFrames: 450,
      props: defaultProps,
    };
  }
};

// ─── HOOK ─────────────────────────────────────────────────────────────────────

const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const imgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
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

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.97) 100%)',
        }}
      />

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
            fontSize: 54,
            fontWeight: 700,
            lineHeight: 1.38,
            textShadow: '0 2px 28px rgba(0,0,0,0.95)',
          }}
        >
          Warum sprechen plötzlich alle über GHK-Cu?
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
        background: 'rgba(0,0,0,0.18)',
      }}
    />
  </AbsoluteFill>
);

// ─── BODY ─────────────────────────────────────────────────────────────────────

const BODY_LINE_TEXTS = [
  'GHK-Cu ist ein Kupfer-Peptid',
  'wird aktuell in der\nForschung untersucht',
  'Fokus auf Haut\n& Regeneration',
];

const BodyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Textzeilen erscheinen bei 8%, 40%, 72% der Szenendauer
  const LINE_START_OFFSETS = [0.08, 0.40, 0.72];

  const imgScale = interpolate(frame, [0, durationInFrames], [1.0, 1.07], {
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
  const labelY = interpolate(labelProgress, [0, 1], [-24, 0]);

  const dividerWidth = interpolate(frame, [14, 42], [0, 110], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ background: BG, fontFamily: FONT, overflow: 'hidden' }}>
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

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,26,26,0.94) 0%, rgba(26,26,26,0.0) 20%, rgba(26,26,26,0.0) 55%, rgba(26,26,26,0.97) 78%)',
        }}
      />

      {/* Label oben */}
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
            color: GOLD,
            fontSize: 82,
            fontWeight: 800,
            letterSpacing: 10,
            textShadow: `0 0 40px rgba(212,175,55,0.5)`,
          }}
        >
          GHK-Cu
        </div>
        <div
          style={{
            height: 1,
            width: dividerWidth,
            background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
            margin: '14px auto 0',
          }}
        />
      </div>

      {/* Body-Zeilen, proportional gestaffelt */}
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          left: 64,
          right: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
          zIndex: 2,
        }}
      >
        {BODY_LINE_TEXTS.map((text, i) => {
          const startFrame = Math.round(LINE_START_OFFSETS[i] * durationInFrames);
          const prog = spring({ frame: frame - startFrame, fps, config: { damping: 200 } });
          const op   = interpolate(frame, [startFrame, startFrame + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const y = interpolate(prog, [0, 1], [26, 0]);

          return (
            <div key={i} style={{ opacity: op, transform: `translateY(${y}px)` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: GOLD,
                    flexShrink: 0,
                    marginTop: 15,
                    boxShadow: `0 0 8px rgba(212,175,55,0.65)`,
                  }}
                />
                <div
                  style={{
                    color: i === 0 ? WHITE : DIM,
                    fontSize: i === 0 ? 42 : 38,
                    fontWeight: i === 0 ? 600 : 400,
                    lineHeight: 1.45,
                    textShadow: '0 2px 14px rgba(0,0,0,0.85)',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {text}
                </div>
              </div>
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
  const logoScale    = interpolate(logoProgress, [0, 1], [0.7, 1]);
  const logoOpacity  = interpolate(frame, [0, 24], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [20, 50], [0, 72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const urlProgress = spring({ frame: frame - 30, fps, config: { damping: 200 } });
  const urlY        = interpolate(urlProgress, [0, 1], [36, 0]);
  const urlOpacity  = interpolate(frame, [30, 48], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const researchOpacity = interpolate(frame, [58, 76], [0, 0.46], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bgGlow = 0.055 + Math.sin(frame * 0.07) * 0.02;

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 46%, #1e1e1e 0%, ${BG} 100%)`,
        fontFamily: FONT,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(212,175,55,${bgGlow}) 0%, transparent 60%)`,
        }}
      />

      <div style={{ opacity: logoOpacity, transform: `scale(${logoScale})`, zIndex: 2 }}>
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 300,
            height: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 24px rgba(212,175,55,0.42))`,
          }}
        />
      </div>

      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
          margin: '48px 0 40px',
          zIndex: 2,
        }}
      />

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

      <div
        style={{
          position: 'absolute',
          bottom: 90,
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

// ─── KOMPOSITION ──────────────────────────────────────────────────────────────
// Szenendauer kommt von calculateMetadata (aus Audiodauer berechnet)
// Formel: hookF + labF + bodyF + ctaF − 3×15f = totalFrames

export const GHKCuAdLab: React.FC<GHKCuAdLabProps> = ({
  hookFrames,
  labFrames,
  bodyFrames,
  ctaFrames,
}) => (
  <AbsoluteFill>
    {/* Voiceover läuft über das gesamte Video */}
    <Audio src={staticFile('ghkcu-voice.mp3')} />

    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={hookFrames}>
        <HookScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={labFrames}>
        <LabScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={bodyFrames}>
        <BodyScene />
      </TransitionSeries.Sequence>

      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
      />

      <TransitionSeries.Sequence durationInFrames={ctaFrames}>
        <CTAScene />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  </AbsoluteFill>
);
