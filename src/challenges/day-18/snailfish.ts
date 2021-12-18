import { Pair } from "./Pair";

export const computeMagnitudeOfFinalSum = (
  snailfishNumbers: Array<string>
): number => {
  let pair: Pair | null = null;
  for (let snailfishNumber of snailfishNumbers) {
    if (pair === null) {
      pair = Pair.createFromString(snailfishNumber);
      continue;
    }
    pair = Pair.createFromPairs(pair, Pair.createFromString(snailfishNumber));
    pair.setDepth(1);
    while (pair.maxDepth() > 4 || pair.maxNum() > 9) {
      while (pair.explode() !== null) {
        pair.setDepth(1);
      }
      pair.split();
      pair.setDepth(1);
    }
  }

  console.log("Reduced number: ", pair!.toString());
  console.log("Magnitude: ", pair!.getMagnitude());

  return pair!.getMagnitude();
};

export const computeLargestMagnitute = (snailfishNumbers: Array<string>) => {
  let largestMagnitute = 0;

  for (let i = 0; i < snailfishNumbers.length; i++) {
    for (let j = 0; j < snailfishNumbers.length; j++) {
      if (i == j) continue;
      let pair1 = Pair.createFromString(snailfishNumbers[i]);
      let pair2 = Pair.createFromString(snailfishNumbers[j]);
      let pair = Pair.createFromPairs(pair1, pair2);
      pair.setDepth(1);
      while (pair.maxDepth() > 4 || pair.maxNum() > 9) {
        while (pair.explode() !== null) {
          pair.setDepth(1);
        }
        pair.split();
        pair.setDepth(1);
      }

      if (pair.getMagnitude() > largestMagnitute) {
        largestMagnitute = pair.getMagnitude();
      }
    }
  }

  console.log("largestMagnitute: ", largestMagnitute);
  return largestMagnitute;
};
