export const computeOverlappingLinePoints = (
  ventLinePoints: Array<string>,
  includeDiagonals: boolean
): number => {
  const lines = ventLinePoints.map(mapToLine);
  const rowSize = getMaxY(lines);
  const columnSize = getMaxX(lines);
  const graph = buildGraph(rowSize, columnSize);

  lines.forEach((line) => plotLine(line, graph, includeDiagonals));
  //logGraph(graph);

  let overlappingPoints = 0;
  graph.forEach((row) =>
    row.forEach((cell) => {
      if (cell.plottedLinePoints > 1) {
        overlappingPoints++;
      }
    })
  );

  return overlappingPoints;
};

function logGraph(graph: Array<Array<GraphPoint>>) {
  for (let y = 0; y < graph.length; y++) {
    let cells = "";
    for (let x = 0; x < graph[y].length; x++) {
      const plottedLinePoints = graph[y][x].plottedLinePoints;
      const cell = plottedLinePoints > 0 ? plottedLinePoints : ".";
      cells += cell;
    }
    console.log(cells);
  }
}

function getMaxX(lines: Array<Line>) {
  return Math.max(
    ...lines
      .map((line) => line.startPoint.x)
      .concat(lines.map((line) => line.endPoint.x))
  );
}

function getMaxY(lines: Array<Line>) {
  return Math.max(
    ...lines
      .map((line) => line.startPoint.y)
      .concat(lines.map((line) => line.endPoint.y))
  );
}

function buildGraph(
  rowSize: number,
  colummSize: number
): Array<Array<GraphPoint>> {
  const graph = [[]] as Array<Array<GraphPoint>>;
  for (let y = 0; y <= rowSize; y++) {
    graph.push([]);
    for (let x = 0; x <= colummSize; x++) {
      graph[y].push({
        x,
        y,
        plottedLinePoints: 0,
      });
    }
  }
  return graph;
}

function plotLine(
  line: Line,
  graph: Array<Array<GraphPoint>>,
  includeDiagonals: boolean
) {
  if (isHorizontalLine(line)) {
    plotHorizontalLine(line, graph);
  } else if (isVerticalLine(line)) {
    plotVerticalLine(line, graph);
  } else if (includeDiagonals) {
    plotDiagonalLine(line, graph);
  }
}

function plotHorizontalLine(line: Line, graph: GraphPoint[][]) {
  const y = line.startPoint.y;
  const startX = Math.min(line.startPoint.x, line.endPoint.x);
  const endX = Math.max(line.startPoint.x, line.endPoint.x);
  for (let x = startX; x <= endX; x++) {
    graph[y][x].plottedLinePoints += 1;
  }
}

function plotVerticalLine(line: Line, graph: GraphPoint[][]) {
  const x = line.startPoint.x;
  const startY = Math.min(line.startPoint.y, line.endPoint.y);
  const endY = Math.max(line.startPoint.y, line.endPoint.y);
  for (let y = startY; y <= endY; y++) {
    graph[y][x].plottedLinePoints += 1;
  }
}

function plotDiagonalLine(line: Line, graph: GraphPoint[][]) {
  const startY = Math.min(line.startPoint.y, line.endPoint.y);
  const endY = Math.max(line.startPoint.y, line.endPoint.y);

  const isFlipped = startY !== line.startPoint.y;
  let startX = isFlipped ? line.endPoint.x : line.startPoint.x;
  let endX = isFlipped ? line.startPoint.x : line.endPoint.x;

  let x = startX;
  for (let y = startY; y <= endY; y++) {
    graph[y][x].plottedLinePoints += 1;
    x += startX < endX ? 1 : -1;
  }
}

function isHorizontalLine(line: Line): boolean {
  return line.startPoint.y === line.endPoint.y;
}

function isVerticalLine(line: Line): boolean {
  return line.startPoint.x === line.endPoint.x;
}

function mapToLine(lineStr: string): Line {
  const linePoints = lineStr.trim().split(" -> ");
  const startCoords = linePoints[0]
    .trim()
    .split(",")
    .map((numStr) => parseInt(numStr, 10));

  const endCoords = linePoints[1]
    .trim()
    .split(",")
    .map((numStr) => parseInt(numStr, 10));

  const startPoint = {
    x: startCoords[0],
    y: startCoords[1],
  };

  const endPoint = {
    x: endCoords[0],
    y: endCoords[1],
  };

  return {
    startPoint,
    endPoint,
  };
}
