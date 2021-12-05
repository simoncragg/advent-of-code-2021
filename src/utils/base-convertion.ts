export const convertToBase10 = (binaryStr: string) => {
  let runningTotal = 0;
  let currentPlaceValue = 1;
  for (let bitIndex = binaryStr.length - 1; bitIndex >= 0; bitIndex--) {
    var bitStr = binaryStr[bitIndex];
    runningTotal += currentPlaceValue * parseInt(bitStr);
    currentPlaceValue *= 2;
  }

  return runningTotal;
};
