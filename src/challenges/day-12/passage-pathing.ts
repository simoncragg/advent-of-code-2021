import { arraysEqual } from "../../utils/array-utils";

export const computeNumOfPathsThatVisitSmallCavesAtMostOnce = (
  caveConnections: Array<string>
): number => {
  const connections = buildConnections(caveConnections);
  const startCave = buildCaveTree(connections);
  const predicate = (fromCave: Cave, toCave: Cave, path: Path) =>
    !isStart(toCave) &&
    !isSmallAndAlreadyVisited(toCave, path) &&
    !hasAlreadyTraversed(fromCave, toCave, path);

  const paths = buildPathsRecursive(startCave, [] as Path, predicate);
  //logPaths(paths.map((path) => path.join(",")));
  return paths.length;
};

export const computeNumOfPathsThatVisitOneSmallCaveTwiceAndTheOtherSmallCavesJustOnce =
  (caveConnections: Array<string>): number => {
    const connections = buildConnections(caveConnections);
    const startCave = buildCaveTree(connections);
    const smallCaves = getDistinctSmallCaves(connections);

    let allPaths = Array<Path>();
    for (const specialCaseId of smallCaves) {
      const predicate = (fromCave: Cave, toCave: Cave, path: Path) =>
        !isStart(toCave) &&
        !isOverVisitedSmallCave(toCave, path, specialCaseId);

      const paths = buildPathsRecursive(
        startCave,
        [] as Path,
        predicate,
        specialCaseId
      );

      allPaths = [...allPaths, ...paths];
    }

    // TODO: optimise
    const distinctPaths = allPaths
      .map((path) => path.join(","))
      .filter((path, i, self) => self.indexOf(path) === i);

    //logPaths(distinctPaths);
    return distinctPaths.length;
  };

function buildConnections(caveConnections: Array<string>): Array<Connection> {
  return caveConnections.map((cc) => {
    const caves = cc.split("-");
    return {
      from: caves[0],
      to: caves[1],
    };
  });
}

function buildCaveTree(connections: Array<Connection>): Cave {
  const caves = Array<Cave>();
  for (const connection of connections) {
    processConnection(connection, caves);
  }
  return caves.find((cave) => cave.id === "start")!;
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

function buildPathsRecursive(
  cave: Cave,
  path: Path,
  predicate: (fromCave: Cave, toCave: Cave, path: Path) => boolean,
  specialCaseId: string | undefined = undefined
): Array<Path> {
  const paths = Array<Path>();
  path.push(cave.id);

  if (cave.id === "end") {
    paths.push(path);
    return paths;
  }

  const linkedCaves = cave.linkedCaves.filter((linkedCave) =>
    predicate(cave, linkedCave, path)
  );
  if (linkedCaves.length > 0) {
    for (const linkedCave of linkedCaves) {
      const newPath = [...path];
      const newPaths = buildPathsRecursive(
        linkedCave,
        newPath,
        predicate,
        specialCaseId
      );
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
  fromCave: Cave,
  toCave: Cave,
  path: Path,
  specialCaseId: string | undefined = undefined
): boolean {
  return toCave.id === specialCaseId
    ? path.filter((id) => id === specialCaseId).length >= 2
    : path.join(",").indexOf(`${fromCave.id},${toCave.id}`) > -1;
}

function isOverVisitedSmallCave(
  cave: Cave,
  path: Path,
  specialCaseId: string
): boolean {
  const maxVisits = cave.id === specialCaseId ? 2 : 1;
  return (
    cave.isSmall && path.filter((id) => id === cave.id).length >= maxVisits
  );
}

function getUniquePaths(newPaths: Array<Path>, existingPaths: Array<Path>) {
  if (existingPaths.length === 0) {
    return newPaths;
  }

  let uniquePaths = [];
  for (const newPath of newPaths) {
    let isUnique = true;
    for (const path of existingPaths) {
      if (arraysEqual(newPath, path)) {
        isUnique = false;
        break;
      }
    }
    if (isUnique) {
      uniquePaths.push(newPath);
    }
  }

  return uniquePaths;
}

function getDistinctSmallCaves(connections: Array<Connection>) {
  const tos = connections
    .filter((c) => c.to === c.to.toLowerCase())
    .map((c) => c.to);
  const froms = connections
    .filter((c) => c.from === c.from.toLowerCase())
    .map((c) => c.from);
  return [...tos, ...froms]
    .filter((id) => id !== "start" && id !== "end")
    .filter((id, i, self) => self.indexOf(id) === i);
}

function logPaths(paths: Array<string>) {
  let pathsLog = "";
  paths.forEach((path) => (pathsLog += `${path}\n`));
  console.log(pathsLog);
}
