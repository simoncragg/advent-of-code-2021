export const findPathWithLowestRisk = (
  input: Array<string>,
  scaleFactor: number = 1
): number => {
  const grid = mapToGrid(input, scaleFactor);
  let counter = 1;
  let nodeCount = grid.nodes.length;

  while (gridHasUnvisitedNodes(grid)) {
    const unvisitedNeighbours = grid.nodes.filter((node) => !node.visited);
    const currentNode = unvisitedNeighbours.sort(
      (a, b) => a.distance - b.distance
    )[0];

    let neighbours = getNeighbours(currentNode, unvisitedNeighbours);
    considerNode(currentNode, neighbours);
    //console.log(`Considering node ${counter} of ${nodeCount}`);
    counter++;

    if (currentNode.x == grid.xSize - 1 && currentNode.y == grid.ySize - 1)
      break;
  }

  const destinationNode = grid.nodes.filter(
    (node) => node.x == grid.xSize - 1 && node.y == grid.ySize - 1
  )[0];

  return destinationNode.distance;
};

function scaleGrid(grid: Grid, scaleFactor: number) {
  const getNewRiskFactor = (node: GNode, tileIndex: number) => {
    return node.riskFactor + tileIndex > 9
      ? node.riskFactor + tileIndex - 9
      : node.riskFactor + tileIndex;
  };

  const horizontalTiles = Array<GNode>();
  for (let i = 1; i < scaleFactor; i++) {
    grid.nodes
      .map((node) => {
        return {
          x: node.x + i * grid.xSize,
          y: node.y,
          distance: Number.MAX_VALUE,
          riskFactor: getNewRiskFactor(node, i),
          visited: false,
        };
      })
      .forEach((node) => horizontalTiles.push(node));
  }
  horizontalTiles.forEach((node) => grid.nodes.push(node));

  const verticalTiles = Array<GNode>();
  for (let i = 1; i < scaleFactor; i++) {
    grid.nodes
      .map((node) => {
        return {
          x: node.x,
          y: node.y + i * grid.ySize,
          distance: Number.MAX_VALUE,
          riskFactor: getNewRiskFactor(node, i),
          visited: false,
        };
      })
      .forEach((node) => verticalTiles.push(node));
  }

  verticalTiles.forEach((node) => grid.nodes.push(node));
  grid.xSize *= scaleFactor;
  grid.ySize *= scaleFactor;
}

function gridHasUnvisitedNodes(grid: Grid): boolean {
  return grid.nodes.filter((x) => !x.visited).length > 0;
}

function getNeighbours(
  currentNode: GNode,
  allNodes: Array<GNode>
): Array<GNode> {
  let neighbours = Array<GNode>();

  const offsets = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];

  for (const offset of offsets) {
    const xOffset = offset[0];
    const yOffset = offset[1];
    const neighbour = getNeighbour(currentNode, allNodes, xOffset, yOffset);
    if (neighbour) {
      neighbours.push(neighbour);
    }
  }

  return neighbours;
}

function getNeighbour(
  currentNode: GNode,
  nodes: Array<GNode>,
  xOffset: number,
  yOffset: number
): GNode | undefined {
  return nodes.find(
    (node) =>
      node.x === currentNode.x + xOffset && node.y + yOffset === currentNode.y
  );
}

function considerNode(currentNode: GNode, neighbours: Array<GNode>): void {
  for (let neighbour of neighbours) {
    var calculatedDistance = currentNode.distance + neighbour.riskFactor;
    if (calculatedDistance < neighbour.distance) {
      neighbour.distance = calculatedDistance;
    }
  }
  currentNode.visited = true;
}

function mapToGrid(inputLines: Array<string>, scaleFactor: number): Grid {
  const grid = {
    ySize: inputLines.length,
    xSize: inputLines[0].split("").length,
    nodes: Array<GNode>(),
  } as Grid;

  for (let y = 0; y < grid.ySize; y++) {
    for (let x = 0; x < grid.xSize; x++) {
      var maxValue = x == 0 && y == 0 ? 0 : Number.MAX_VALUE;
      grid.nodes.push({
        x,
        y,
        riskFactor: parseInt(inputLines[y][x], 10),
        distance: maxValue,
        visited: false,
      });
    }
  }

  scaleGrid(grid, scaleFactor);
  //logGrid(grid);

  return grid;
}

function logGrid(grid: Grid): void {
  const yGroups = grid.nodes.reduce(
    (acc, curr): Record<string, Array<GNode>> => {
      (acc[curr.y] ||= []).push(curr);
      return acc;
    },
    {} as Record<string, Array<GNode>>
  );

  let output = "";
  for (const yGroupKey of Object.keys(yGroups)) {
    output += `${yGroups[yGroupKey].map((node) => node.riskFactor).join("")}\n`;
  }
  console.log(output);
}
