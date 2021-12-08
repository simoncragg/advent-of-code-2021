export const computeCheapestAlignment = (
  positions: Array<number>,
  useIncrementalFuel: boolean
): number => {
  let cheapestFuelCost = Number.MAX_SAFE_INTEGER;
  let cheapestAlignmentPos = 0;

  let potentialAlignmentPositions =
    getAllPotentialAlignmentPositions(positions);
  for (const alignmentPosition of potentialAlignmentPositions) {
    const fuelCost = computeAlignmentCost(
      positions,
      alignmentPosition,
      useIncrementalFuel
    );
    //console.log("fuelCost", fuelCost);
    if (fuelCost < cheapestFuelCost) {
      cheapestFuelCost = fuelCost;
      cheapestAlignmentPos = alignmentPosition;
    }
  }

  return cheapestFuelCost;
};

function getAllPotentialAlignmentPositions(
  positions: Array<number>
): Array<number> {
  const orderedAlignmentPositions = positions.sort((a, b) => a - b);
  let minPos = orderedAlignmentPositions[0];
  let maxPos = orderedAlignmentPositions[orderedAlignmentPositions.length - 1];
  let potentialAlignmentPositions = Array<number>();
  for (let pos = minPos; pos <= maxPos; pos++) {
    potentialAlignmentPositions.push(pos);
  }
  return potentialAlignmentPositions;
}

function computeAlignmentCost(
  initialPositions: Array<number>,
  targetPosition: number,
  useIncrementalFuel: boolean
): number {
  const positions = [...initialPositions];
  let fuelCost = 0;

  for (let i = 0; i < positions.length; i++) {
    let fuelIncrement = 0;
    while (positions[i] !== targetPosition) {
      const movement = positions[i] < targetPosition ? 1 : -1;
      positions[i] += movement;
      fuelIncrement += 1;
      fuelCost += useIncrementalFuel ? fuelIncrement : 1;
    }
  }
  return fuelCost;
}
