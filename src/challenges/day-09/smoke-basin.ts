export const computeRiskLevel = (input: Array<string>): number => {
  let riskLevel = 0;
  const heightMap = mapToHeightMap(input);
  for (let r = 0; r < heightMap.length; r++) {
    for (let c = 0; c < heightMap[r].length; c++) {
      const lowPoint = findLowPoint(r, c, heightMap);
      if (lowPoint != undefined) {
        riskLevel += lowPoint.height + 1;
      }
    }
  }
  return riskLevel;
};

export const findBasinsResult = (input: Array<string>): number => {
  const heightMap = mapToHeightMap(input);
  const basins = findBasins(heightMap);
  const descendingBasins = basins.sort((b1, b2) => b2.size - b1.size);

  return (
    descendingBasins[0].size *
    descendingBasins[1].size *
    descendingBasins[2].size
  );
};

function findBasins(heightMap: number[][]): Array<Basin> {
  const basins = Array<Basin>();
  for (let r = 0; r < heightMap.length; r++) {
    for (let c = 0; c < heightMap[r].length; c++) {
      const lowPoint = findLowPoint(r, c, heightMap);
      if (lowPoint !== undefined) {
        const basin = buildBasin(lowPoint, heightMap);
        basins.push(basin);
      }
    }
  }
  return basins;
}

function buildBasin(
  lowPoint: FlowPoint,
  heightMap: Array<Array<number>>
): Basin {
  let higherPoints: Array<FlowPoint> = findHigherPointsRecursive(
    [lowPoint],
    heightMap
  );

  return {
    lowPoint,
    flowPoints: higherPoints,
    size: higherPoints.length + 1,
  };
}

function findHigherPointsRecursive(
  startPoints: Array<FlowPoint>,
  heightMap: Array<Array<number>>
): Array<FlowPoint> {
  let higherPoints = startPoints.flatMap((startPoint) =>
    findHigherPoints(startPoint, heightMap)
  );
  if (higherPoints.length > 0) {
    higherPoints = [
      ...higherPoints,
      ...findHigherPointsRecursive(higherPoints, heightMap),
    ];
  }
  const distinctPoints = Array<FlowPoint>();
  for (const hp of higherPoints) {
    if (!distinctPoints.find((p) => p.r === hp.r && p.c == hp.c)) {
      distinctPoints.push(hp);
    }
  }
  return distinctPoints;
}

function findHigherPoints(
  startPoint: FlowPoint,
  heightMap: Array<Array<number>>
): Array<FlowPoint> {
  const maxHeight = 8;
  const higherPoints = Array<FlowPoint>();
  const { r, c, height } = startPoint;

  if (!isTopRow(r)) {
    let row = r - 1;
    let neighbourHeight = heightMap[row][c];
    if (isHigherAndInRange(height, neighbourHeight, maxHeight)) {
      higherPoints.push({ r: row, c, height: neighbourHeight });
    }
  }

  if (!isRightMostColumn(r, c, heightMap)) {
    let col = c + 1;
    let neighbourHeight = heightMap[r][col];
    if (height < neighbourHeight && neighbourHeight <= maxHeight) {
      higherPoints.push({ r, c: col, height: neighbourHeight });
    }
  }

  if (!isBottomRow(r, heightMap)) {
    let row = r + 1;
    let neighbourHeight = heightMap[row][c];
    if (height < neighbourHeight && neighbourHeight <= maxHeight) {
      higherPoints.push({ r: row, c, height: neighbourHeight });
    }
  }

  if (!isLeftMostColumn(c)) {
    let col = c - 1;
    let neighbourHeight = heightMap[r][col];
    if (height < neighbourHeight && neighbourHeight <= maxHeight) {
      higherPoints.push({ r, c: col, height: neighbourHeight });
    }
  }

  return higherPoints;
}

function isHigherAndInRange(
  height: number,
  neighbourHeight: number,
  maxHeight: number
) {
  return height < neighbourHeight && neighbourHeight <= maxHeight;
}

function isTopRow(r: number): boolean {
  return r === 0;
}

function isLeftMostColumn(c: number): boolean {
  return c === 0;
}

function isRightMostColumn(
  r: number,
  c: number,
  heightMap: Array<Array<number>>
): boolean {
  return c === heightMap[r].length - 1;
}

function isBottomRow(r: number, heightMap: Array<Array<number>>): boolean {
  return r === heightMap.length - 1;
}

function findLowPoint(
  r: number,
  c: number,
  heightMap: Array<Array<number>>
): FlowPoint | undefined {
  const height = heightMap[r][c];
  if (r == 0 || height < heightMap[r - 1][c]) {
    if (c == heightMap[r].length - 1 || height < heightMap[r][c + 1]) {
      if (r == heightMap.length - 1 || height < heightMap[r + 1][c]) {
        if (c == 0 || height < heightMap[r][c - 1]) {
          return { r, c, height };
        }
      }
    }
  }

  return undefined;
}

function mapToHeightMap(input: Array<string>): Array<Array<number>> {
  return input.map((n) =>
    n
      .trim()
      .split("")
      .map((n) => parseInt(n.trim(), 10))
  );
}
