export const findPathWithLowestRisk = (input: Array<string>): number => {
  let grid = mapToGrid(input);
  let counter = 1;
  var nodeCount = grid.nodes.length;
  while (gridHasUnvisitedNodes(grid)) {
    var unvisitedNeighbours = grid.nodes.filter((node) => !node.visited);
    var currentNode = unvisitedNeighbours.sort(
      (a, b) => a.distance - b.distance
    )[0];
    var neighbours = getNeighbours(currentNode, unvisitedNeighbours);
    considerNode(currentNode, neighbours);
    console.log(`Considering node ${counter} of ${nodeCount}`);
    counter++;
    if (currentNode.x == grid.xSize - 1 && currentNode.y == grid.ySize - 1)
      break;
  }

  const destinationNode = grid.nodes.filter(
    (node) => node.x == grid.xSize - 1 && node.y == grid.ySize - 1
  )[0];

  return destinationNode.distance;
};

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

function mapToGrid(inputLines: Array<string>): Grid {
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

  return grid;
}
