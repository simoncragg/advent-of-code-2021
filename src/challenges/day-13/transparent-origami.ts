export const countDotsAfterOneFold = (inputLines: Array<string>): number => {
  let dotCoords = mapToCoordinates(inputLines);
  const foldingInstructions = mapToFoldInstructions(inputLines);

  let dotsCount = new Array<number>();
  dotCoords = performFold(dotCoords, foldingInstructions[0]);
  dotsCount.push(dotCoords.length);

  logPaper(dotCoords);
  return dotsCount[0];
};

export const countDotsAfterAllFolds = (inputLines: Array<string>): number => {
  let dotCoords = mapToCoordinates(inputLines);
  const foldInstructions = mapToFoldInstructions(inputLines);

  let dotsCount = new Array<number>();
  for (const foldInstruction of foldInstructions) {
    dotCoords = performFold(dotCoords, foldInstruction);
    dotsCount.push(dotCoords.length);
  }

  logPaper(dotCoords);
  return dotsCount[0];
};

function mapToCoordinates(inputLines: Array<string>): Array<Coordinate> {
  let coords = Array<Coordinate>();
  for (let i = 0; i < inputLines.length; i++) {
    const line = inputLines[i];
    const coordParts = line.split(",").map((n) => parseInt(n, 10));

    if (coordParts.length === 1) {
      break;
    }

    const x = coordParts[0];
    const y = coordParts[1];
    coords.push({ x, y });
  }

  return coords;
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
  dotCoords: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  const newCoords = getStaticCoords(dotCoords, foldInstruction);
  const foldingCoords = getFoldingCoords(dotCoords, foldInstruction);

  for (const coord of foldingCoords) {
    const foldedCoord = foldCoord(coord, foldInstruction);

    // TODO: use a hash to improve performance
    if (
      !newCoords.find(
        (coord) => coord.x === foldedCoord.x && coord.y === foldedCoord.y
      )
    ) {
      newCoords.push(foldedCoord);
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
  coords: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  return foldInstruction.isXAxis
    ? coords.filter((coord) => coord.x < foldInstruction.foldPoint)
    : coords.filter((coord) => coord.y < foldInstruction.foldPoint);
}

function getFoldingCoords(
  coords: Array<Coordinate>,
  foldInstruction: FoldInstruction
): Array<Coordinate> {
  return foldInstruction.isXAxis
    ? coords.filter((coord) => coord.x > foldInstruction.foldPoint)
    : coords.filter((coord) => coord.y > foldInstruction.foldPoint);
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
