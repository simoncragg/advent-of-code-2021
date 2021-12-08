import { convertToBase10 } from "../../utils/base-convertion";

export const computePowerConsumption = (diagnostics: Array<string>): number => {
  const gammaRate = computeRate(diagnostics, true);
  const epsilonRate = computeRate(diagnostics, false);
  return gammaRate * epsilonRate;
};

export const computeLifeSupportRating = (
  diagnostics: Array<string>
): number => {
  const oxygenGeneratorRating = computeRating(diagnostics, true);
  const co2ScrubberRating = computeRating(diagnostics, false);
  return oxygenGeneratorRating * co2ScrubberRating;
};

function computeRate(diagnostics: string[], useMostCommonBit: boolean) {
  const mostSignificantBits = computeMostSignificantBits(
    diagnostics,
    useMostCommonBit
  );
  return convertToBase10(mostSignificantBits);
}

function computeRating(diagnostics: Array<string>, useMostCommonBit: boolean) {
  let candidates = [...diagnostics];
  let currentBitIndex = 0;
  while (candidates.length > 1) {
    const mostSignificantBit = computeMostSignifcantBit(
      candidates,
      currentBitIndex,
      useMostCommonBit
    );

    candidates = candidates.filter(
      (candidate) => candidate[currentBitIndex] === mostSignificantBit
    );
    currentBitIndex++;
  }
  return convertToBase10(candidates[0]);
}

function computeMostSignificantBits(
  diagnostics: Array<string>,
  useMostCommonBit: boolean
) {
  let mostSignificantBits = "";
  const numOfBits = diagnostics[0].length;
  for (let bitIndex = 0; bitIndex < numOfBits; bitIndex++) {
    mostSignificantBits += computeMostSignifcantBit(
      diagnostics,
      bitIndex,
      useMostCommonBit
    );
  }
  return mostSignificantBits;
}

function computeMostSignifcantBit(
  diagnostics: Array<string>,
  bitIndex: number,
  useMostCommonBit: boolean
): string {
  let onesCount = 0;
  diagnostics.forEach((binaryStr) => {
    if (binaryStr[bitIndex] === "1") {
      onesCount++;
    }
  });
  const isOneTheLeastSignificantNumber = onesCount < diagnostics.length / 2;
  const leastCommonBit = isOneTheLeastSignificantNumber ? "1" : "0";
  const mostCommonBit = isOneTheLeastSignificantNumber ? "0" : "1";
  return useMostCommonBit ? mostCommonBit : leastCommonBit;
}
