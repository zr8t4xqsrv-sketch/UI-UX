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

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo fades + scales in
  const logoProgress = spring({ frame, fps, config: { damping: 200 } });
  const logoScale = interpolate(logoProgress, [0, 1], [0.6, 1]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Divider line grows
  const lineWidth = interpolate(frame, [16, 42], [0, 72], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // URL slides up
  const urlProgress = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  const urlY = interpolate(urlProgress, [0, 1], [44, 0]);
  const urlOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const urlGlow = 0.5 + Math.sin(frame * 0.18) * 0.3;

  // Button entrance
  const btnProgress = spring({ frame: frame - 46, fps, config: { damping: 200 } });
  const btnScale = interpolate(btnProgress, [0, 1], [0.72, 1]);
  const btnOpacity = interpolate(frame, [46, 62], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const btnPulse = 1 + Math.sin(frame * 0.13) * 0.022;
  const btnGlow = 0.5 + Math.sin(frame * 0.15) * 0.32;

  // Background glow pulse
  const bgGlow = 0.07 + Math.sin(frame * 0.07) * 0.03;

  // Footer opacity
  const footerOpacity = interpolate(frame, [68, 84], [0, 0.6], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 48%, #202020 0%, ${COLORS.bgDark} 100%)`,
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
          width: 700,
          height: 700,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${rgba.gold(bgGlow)} 0%, transparent 60%)`,
        }}
      />

      {/* Logo */}
      <div
        style={{
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
          zIndex: 2,
          marginBottom: 4,
        }}
      >
        <Img
          src={staticFile('logo.png')}
          style={{
            width: 320,
            height: 'auto',
            objectFit: 'contain',
            filter: `drop-shadow(0 0 32px ${rgba.gold(0.5)})`,
          }}
        />
      </div>

      {/* Gold divider */}
      <div
        style={{
          height: 1,
          width: `${lineWidth}%`,
          background: `linear-gradient(to right, transparent, ${COLORS.gold}, transparent)`,
          margin: '40px 0 36px',
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
            color: COLORS.white,
            fontSize: 36,
            fontWeight: 500,
            letterSpacing: 1,
            textShadow: `0 0 ${urlGlow * 24}px ${COLORS.gold}, 0 0 ${urlGlow * 48}px ${rgba.gold(0.4)}`,
          }}
        >
          viennapeptides.com
        </div>
      </div>

      {/* CTA Button */}
      <div
        style={{
          marginTop: 52,
          opacity: btnOpacity,
          transform: `scale(${btnScale * btnPulse})`,
          zIndex: 2,
        }}
      >
        <div
          style={{
            background: `linear-gradient(135deg, ${COLORS.gold}, #b8941e)`,
            color: COLORS.bgDark,
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: 3,
            padding: '26px 80px',
            borderRadius: 60,
            textTransform: 'uppercase',
            boxShadow: `0 0 ${btnGlow * 36}px ${rgba.gold(0.6)}, 0 0 ${btnGlow * 70}px ${rgba.gold(0.28)}, 0 8px 32px rgba(0,0,0,0.5)`,
          }}
        >
          Jetzt bestellen
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 72,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: footerOpacity,
          color: COLORS.whiteMid,
          fontSize: 20,
          letterSpacing: 3,
          zIndex: 2,
        }}
      >
        EU · Premium Quality · Research Use Only
      </div>
    </AbsoluteFill>
  );
};
