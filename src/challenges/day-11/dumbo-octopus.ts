export const computeTotalFlashes = (
  energyMatrix: Array<Array<number>>,
  steps: number
): number => {
  const octopusMatrix = mapToOctopusMatrix(energyMatrix);
  for (let step = 1; step <= steps; step++) {
    walkMatrix(octopusMatrix, (octopus) => {
      processOctopus(octopus, octopusMatrix);
    });
    resetFlashers(octopusMatrix);
  }

  return sumFlashCounts(octopusMatrix);
};

export const computeFirstStepWhenAllFlash = (
  energyMatrix: Array<Array<number>>
): number => {
  const octopusMatrix = mapToOctopusMatrix(energyMatrix);
  let step = 1;
  while (true) {
    walkMatrix(octopusMatrix, (octopus) => {
      processOctopus(octopus, octopusMatrix);
    });

    if (
      calcFlashCountThisStep(octopusMatrix) ===
      octopusMatrix.length * octopusMatrix[0].length
    ) {
      return step;
    }

    resetFlashers(octopusMatrix);
    step++;
  }
};

function calcFlashCountThisStep(octopusMatrix: Array<Array<Octopus>>): number {
  let total = 0;
  walkMatrix(octopusMatrix, (octopus: Octopus) => {
    if (octopus.didFlashInCurrentStep) {
      total++;
    }
  });
  return total;
}

function mapToOctopusMatrix(
  energyMatrix: Array<Array<number>>
): Array<Array<Octopus>> {
  return energyMatrix.map((row, y) =>
    row.map((cell, x) => {
      return {
        x,
        y,
        energyLevel: cell,
        didFlashInCurrentStep: false,
        flashCount: 0,
      };
    })
  );
}

function walkMatrix(
  octopusMatrix: Array<Array<Octopus>>,
  action: (octopus: any) => void
) {
  for (let y = 0; y < octopusMatrix.length; y++) {
    for (let x = 0; x < octopusMatrix[y].length; x++) {
      const octopus = octopusMatrix[y][x];
      action(octopus);
    }
  }
}

function processOctopus(
  octopus: Octopus,
  octopusMatrix: Array<Array<Octopus>>
): void {
  octopus.energyLevel++;
  if (octopus.energyLevel > 9 && !octopus.didFlashInCurrentStep) {
    flash(octopus, octopusMatrix);
  }
}

function flash(octopus: Octopus, octopusMatrix: Array<Array<Octopus>>) {
  octopus.flashCount++;
  octopus.didFlashInCurrentStep = true;
  updateNeightbours(octopus, octopusMatrix);
}

function updateNeightbours(
  octopus: Octopus,
  octopusMatrix: Array<Array<Octopus>>
) {
  if (!isOnTopRow(octopus)) {
    const y = octopus.y - 1;
    if (!isOnFarLeft(octopus)) {
      const neighbour = octopusMatrix[y][octopus.x - 1];
      processOctopus(neighbour, octopusMatrix);
    }

    const neighbour = octopusMatrix[y][octopus.x];
    processOctopus(neighbour, octopusMatrix);

    if (!isOnFarRight(octopus, octopusMatrix)) {
      const neighbour = octopusMatrix[y][octopus.x + 1];
      processOctopus(neighbour, octopusMatrix);
    }
  }

  if (!isOnFarLeft(octopus)) {
    const neighbour = octopusMatrix[octopus.y][octopus.x - 1];
    processOctopus(neighbour, octopusMatrix);
  }

  if (!isOnFarRight(octopus, octopusMatrix)) {
    const neighbour = octopusMatrix[octopus.y][octopus.x + 1];
    processOctopus(neighbour, octopusMatrix);
  }

  if (!isOnBottomRow(octopus, octopusMatrix)) {
    const y = octopus.y + 1;
    if (!isOnFarLeft(octopus)) {
      const neighbour = octopusMatrix[y][octopus.x - 1];
      processOctopus(neighbour, octopusMatrix);
    }

    const neighbour = octopusMatrix[y][octopus.x];
    processOctopus(neighbour, octopusMatrix);

    if (!isOnFarRight(octopus, octopusMatrix)) {
      const neighbour = octopusMatrix[y][octopus.x + 1];
      processOctopus(neighbour, octopusMatrix);
    }
  }
}

function isOnTopRow(octopus: Octopus): boolean {
  return octopus.y === 0;
}

function isOnFarLeft(octopus: Octopus): boolean {
  return octopus.x === 0;
}

function isOnBottomRow(
  octopus: Octopus,
  octopusMatrix: Array<Array<Octopus>>
): boolean {
  return octopus.y === octopusMatrix.length - 1;
}

function isOnFarRight(
  octopus: Octopus,
  octopusMatrix: Array<Array<Octopus>>
): boolean {
  return octopus.x === octopusMatrix[octopus.y].length - 1;
}

function resetFlashers(octopusMatrix: Array<Array<Octopus>>): void {
  walkMatrix(octopusMatrix, (octopus) => {
    if (octopus.didFlashInCurrentStep) {
      octopus.energyLevel = 0;
      octopus.didFlashInCurrentStep = false;
    }
  });
}

function sumFlashCounts(octopusMatrix: Array<Array<Octopus>>): number {
  let flashCount = 0;
  walkMatrix(octopusMatrix, (octopus) => {
    flashCount += octopus.flashCount;
  });
  return flashCount;
}
