import React from 'react';
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { HookScene } from './HookScene';
import { ProblemSolutionScene } from './ProblemSolutionScene';
import { SocialProofScene } from './SocialProofScene';
import { CTAScene } from './CTAScene';

// Total: 450 frames (15 s @ 30 fps)
// 3 cross-fades × 9 frames overlap = 27 frames
// Scene sum: 99 + 159 + 120 + 99 = 477   →   477 – 27 = 450 ✓

export const ViennaPeptidesAd: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Scene 1 – HOOK (0–3.3 s) */}
        <TransitionSeries.Sequence durationInFrames={99}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />

        {/* Scene 2 – PROBLEM / SOLUTION (3–8.6 s) */}
        <TransitionSeries.Sequence durationInFrames={159}>
          <ProblemSolutionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />

        {/* Scene 3 – SOCIAL PROOF (8.3–12.3 s) */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <SocialProofScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 9 })}
        />

        {/* Scene 4 – CTA (12–15 s) */}
        <TransitionSeries.Sequence durationInFrames={99}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
