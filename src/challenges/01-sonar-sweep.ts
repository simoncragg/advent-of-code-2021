export const countIncreasedDepths = (depths: Array<number>) => {
  let increasedDepthCount = 0;
  for (let i = 1; i < depths.length; i++) {
    if (depths[i] > depths[i - 1]) {
      increasedDepthCount++;
    }
  }
  return increasedDepthCount;
};

export const countSlidingWindowIncreasedDepths = (
  depths: Array<number>,
  windowSize: number
) => {
  const windowSums = Array<number>();
  for (let i = 0; i <= depths.length - windowSize; i++) {
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      sum += depths[i + j];
    }
    windowSums.push(sum);
  }
  return countIncreasedDepths(windowSums);
};
