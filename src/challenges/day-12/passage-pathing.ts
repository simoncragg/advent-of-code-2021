export const computeNumOfPathsThatVisitSmallCavesAtMostOnce = (
  caveConnections: Array<string>
): number => {
  const startCave = buildCaveTree(caveConnections);
  const paths = buildPathsRecursive(startCave, [] as Path);
  //paths.forEach((path) => console.log(path.join(",")));
  return paths.length;
};

function buildPathsRecursive(cave: Cave, path: Path): Array<Path> {
  const paths = Array<Path>();
  path.push(cave.id);

  if (cave.id === "end") {
    paths.push(path);
    return paths;
  }

  const linkedCaves = cave.linkedCaves.filter(
    (linkedCave) =>
      !isStart(linkedCave) &&
      !isSmallAndAlreadyVisited(linkedCave, path) &&
      !hasAlreadyTraversed(cave, linkedCave, path)
  );
  if (linkedCaves.length > 0) {
    for (const linkedCave of linkedCaves) {
      const newPath = [...path];
      const newPaths = buildPathsRecursive(linkedCave, newPath);
      for (const newPath of newPaths) {
        paths.push(newPath);
      }
    }
  }
  return paths;
}

function isStart(cave: Cave): boolean {
  return cave.id === "start";
}

function isSmallAndAlreadyVisited(cave: Cave, path: Array<string>): boolean {
  return cave.isSmall && path.indexOf(cave.id) > -1;
}

function hasAlreadyTraversed(
  cave: Cave,
  linkedCave: Cave,
  path: Array<string>
): boolean {
  return path.join(",").indexOf(`${cave.id},${linkedCave.id}`) > -1;
}

function buildCaveTree(caveConnections: Array<string>): Cave {
  const connections = buildConnections(caveConnections);
  const caves = Array<Cave>();
  for (const connection of connections) {
    processConnection(connection, caves);
  }
  return caves.find((cave) => cave.id === "start")!;
}

function buildConnections(caveConnections: Array<string>): Array<Connection> {
  return caveConnections.map((cc) => {
    const caves = cc.split("-");
    return {
      from: caves[0],
      to: caves[1],
    };
  });
}

function processConnection(connection: Connection, caves: Array<Cave>) {
  let caveA = caves.find((cave) => cave.id === connection.from);
  let caveB = caves.find((cave) => cave.id === connection.to);

  if (!caveA) {
    caveA = {
      id: connection.from,
      isSmall: connection.from === connection.from.toLowerCase(),
      linkedCaves: [],
    };
    caves.push(caveA);
  }

  if (!caveB) {
    caveB = {
      id: connection.to,
      isSmall: connection.to === connection.to.toLocaleLowerCase(),
      linkedCaves: [],
    };
    caves.push(caveB);
  }

  caveA.linkedCaves.push(caveB);
  caveB.linkedCaves.push(caveA);
}
