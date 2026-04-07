import { Composition } from "remotion";
import {
  GHKCuAdLab,
  calculateMetadata as ghkCuMeta,
  defaultProps as ghkCuDefaults,
} from "./GHKCu/GHKCuAdLab";
import {
  RetatrutideAd,
  calculateMetadata as retatrutideMeta,
  defaultProps as retatrutideDefaults,
} from "./RetatrutideAd/RetatrutideAd";
import { ViennaPeptidesV2 } from "./ViennaPeptidesV2/ViennaPeptidesV2";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GHKCuAdLab"
        component={GHKCuAdLab}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={ghkCuDefaults}
        calculateMetadata={ghkCuMeta}
      />

      <Composition
        id="RetatrutideAd"
        component={RetatrutideAd}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={retatrutideDefaults}
        calculateMetadata={retatrutideMeta}
      />
      <Composition
        id="ViennaPeptidesV2"
        component={ViennaPeptidesV2}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
