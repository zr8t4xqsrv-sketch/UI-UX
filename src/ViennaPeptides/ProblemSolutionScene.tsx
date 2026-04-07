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
import { COLORS, FONT } from './shared';

// Product slides: trio first, then individual products
const SLIDES = [
  { file: 'trio.png',        name: 'Trio Pack',    start: 0,   end: 72 },
  { file: 'retatrutide.png', name: 'Retatrutide',  start: 60,  end: 120 },
  { file: 'melanotan.png',   name: 'Melanotan II', start: 109, end: 159 },
];

const FADE_DURATION = 14;

const ProductSlide: React.FC<{
  file: string;
  name: string;
  start: number;
  end: number;
  frame: number;
  fps: number;
}> = ({ file, name, start, end, frame, fps }) => {
  // Cross-fade in/out
  const opacity = interpolate(
    frame,
    [start, start + FADE_DURATION, end - FADE_DURATION, end],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Slow zoom within this slide's window
  const scale = interpolate(frame, [start, end], [1.0, 1.08], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Name label slides up after fade-in
  const labelProgress = spring({ frame: frame - (start + FADE_DURATION), fps, config: { damping: 200 } });
  const labelY = interpolate(labelProgress, [0, 1], [36, 0]);
  const labelOpacity = interpolate(
    frame,
    [start + FADE_DURATION, start + FADE_DURATION + 12, end - 18, end - 4],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  if (opacity <= 0) return null;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity }}>
      {/* Product image */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <Img
          src={staticFile(file)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Bottom gradient for label readability */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 320,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        }}
      />

      {/* Product name */}
      <div
        style={{
          position: 'absolute',
          bottom: 140,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
        }}
      >
        <div
          style={{
            color: COLORS.white,
            fontSize: 52,
            fontWeight: 700,
            letterSpacing: 4,
            textTransform: 'uppercase',
            textShadow: '0 2px 20px rgba(0,0,0,0.9)',
          }}
        >
          {name}
        </div>
        <div
          style={{
            height: 1,
            width: 160,
            background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
            margin: '14px auto 0',
          }}
        />
      </div>
    </div>
  );
};

export const ProblemSolutionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Persistent dark background
  return (
    <AbsoluteFill
      style={{
        background: COLORS.bgDark,
        fontFamily: FONT,
        overflow: 'hidden',
      }}
    >
      {/* Subtle gold vignette on edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: `inset 0 0 120px rgba(0,0,0,0.6)`,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {SLIDES.map((slide) => (
        <ProductSlide key={slide.file} {...slide} frame={frame} fps={fps} />
      ))}

      {/* Top gold accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
          opacity: 0.6,
          zIndex: 2,
        }}
      />

      {/* Bottom gold accent line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
          opacity: 0.6,
          zIndex: 2,
        }}
      />
    </AbsoluteFill>
  );
};
