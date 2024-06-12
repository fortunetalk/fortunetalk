import {curveBasis, line} from 'd3-shape';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useMemo} from 'react';
import {parse} from 'react-native-redash';
import { SCREEN_WIDTH } from '../assets/styles';

type GenerateTabShapePath = (
  position: number,
  adjustedHeight: number,
) => string;

const NUM_TABS = 5;
const SCALE = 0.7;
const TAB_BAR_HEIGHT = 55;

const generateTabShapePath: GenerateTabShapePath = (
  position,
  adjustedHeight,
) => {
  const adjustedWith = SCREEN_WIDTH / NUM_TABS;
  const tabX = adjustedWith * position;
  const linearGenerator = line().curve(curveBasis);

  const tab = linearGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 40) * SCALE, 0],
    [tabX - (50 - 15) * SCALE, -1 * SCALE],
    [tabX - (50 - 25) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 25) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, -1 * SCALE],
    [tabX + (65 + 40) * SCALE, 0],
    [tabX + 100 * SCALE, 0]
  ]);
  return `${tab}`;
};

const usePath = () => {
  const insets = useSafeAreaInsets();
  const tHight = TAB_BAR_HEIGHT + insets.bottom;
  const adjustedHeight = tHight * 1.4;
  const r = 8

  const containerPath = useMemo(() => {
    return`
    M${r},0
    H${SCREEN_WIDTH - r}
    A${r},${r} 0 0 1 ${SCREEN_WIDTH},${r}
    V${tHight}
    H0
    V${r}
    A${r},${r} 0 0 1 ${r},0
    Z
  `;
  }, [tHight]);

  const curvedPaths = useMemo(() => {
    return Array.from({length: NUM_TABS}, (_, index) => {
      const tabShapePath = generateTabShapePath(
        index + 0.5,
        adjustedHeight + 10,
      );
      return parse(`${tabShapePath}`);
    });
  }, [adjustedHeight]);

  return {containerPath, curvedPaths, tHight};
};

export default usePath;
