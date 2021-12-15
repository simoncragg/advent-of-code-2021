export const countDotsAfterOneFold = (inputLines: Array<string>): number => {
  let coordinates = mapToCoordinates(inputLines);
  const foldingInstructions = mapToFoldInstructions(inputLines);

  let pointsCount = new Array<number>();
  coordinates = performFold(coordinates, foldingInstructions[0]);
  pointsCount.push(coordinates.length);

  logPaper(coordinates);
  return pointsCount[0];
};

export const countDotsAfterAllFolds = (inputLines: Array<string>): number => {
  let coordinates = mapToCoordinates(inputLines);
  const foldInstructions = mapToFoldInstructions(inputLines);

  let pointsCount = new Array<number>();
  for (const foldInstruction of foldInstructions) {
    coordinates = performFold(coordinates, foldInstruction);
    pointsCount.push(coordinates.length);
  }

  logPaper(coordinates);
  return pointsCount[0];
};

function mapToCoordinates(inputLines: Array<string>): Array<Coordinate> {
  let points = Array<Coordinate>();
  for (let i = 0; i < inputLines.length; i++) {
    const line = inputLines[i];
    const coords = line.split(",").map((n) => parseInt(n, 10));

    if (coords.length === 1) {
      break;
    }

    const x = coords[0];
    const y = coords[1];
    points.push({ x, y });
  }

  return points;
}

function mapToFoldInstructions(
  inputLines: Array<string>
): Array<FoldInstruction> {
  const foldInstructions = Array<FoldInstruction>();
  for (let i = 0; i < inputLines.length; i++) {
    const inputLine = inputLines[i];
    if (inputLine.indexOf("fold along ") === -1) {
      continue;
    }

    const parts = inputLine.split("fold along ");
    const instructions = parts[1].split("=");
    foldInstructions.push({
      isXAxis: instructions[0] === "x",
      foldPoint: parseInt(instructions[1], 10),
    });
  }

  return foldInstructions;
}

function performFold(
  coordinates: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  const newCoords = getStaticCoords(coordinates, foldInstruction);
  const foldingCoords = getFoldingCoords(coordinates, foldInstruction);

  for (const coord of foldingCoords) {
    const newCoordinate = foldCoord(coord, foldInstruction);

    // TODO: use a hash to improve performance
    if (
      !newCoords.find(
        (coord) => coord.x === newCoordinate.x && coord.y === newCoordinate.y
      )
    ) {
      newCoords.push(newCoordinate);
    }
  }

  return newCoords;
}

function foldCoord(
  { x, y }: Coordinate,
  foldInstruction: FoldInstruction
): Coordinate {
  return foldInstruction.isXAxis
    ? { x: foldInstruction.foldPoint - (x - foldInstruction.foldPoint), y }
    : { x, y: foldInstruction.foldPoint - (y - foldInstruction.foldPoint) };
}

function getStaticCoords(
  coordinates: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  return foldInstruction.isXAxis
    ? coordinates.filter((coord) => coord.x < foldInstruction.foldPoint)
    : coordinates.filter((coord) => coord.y < foldInstruction.foldPoint);
}

function getFoldingCoords(
  coordinates: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  return foldInstruction.isXAxis
    ? coordinates.filter((coord) => coord.x > foldInstruction.foldPoint)
    : coordinates.filter((coord) => coord.y > foldInstruction.foldPoint);
}

function logPaper(coordinates: Array<Coordinate>): void {
  var maxX = coordinates.map((coord) => coord.x).sort((a, b) => b - a)[0] + 1;
  var maxY = coordinates.map((coord) => coord.y).sort((a, b) => b - a)[0] + 1;

  let output = "";
  for (var y = 0; y < maxY; y++) {
    for (var x = 0; x < maxX; x++) {
      output += coordinates.find((coord) => coord.x === x && coord.y === y)
        ? "# "
        : ". ";
    }
    output += "\n";
  }

  console.log(output);
}
