import { Point3d } from "./Point3d";
import { Pair } from "./Pair";
import { Scanner } from "./Scanner";
import { unorderedPairs } from "../../utils/array-utils";
import {
  genXRotationMatrix,
  genYRotationMatrix,
  genZRotationMatrix,
  multiply,
  toRadians,
} from "../../utils/matrix-utils";

export const computeBeaconCount = (input: string): number => {
  const scanners = mapToScanners(input);
  const orientedScanners = getOrientedScanners(scanners);
  const beaconSet = new Set<string>();
  orientedScanners.forEach((scanner) =>
    scanner.beacons.forEach((beacon) => beaconSet.add(beacon.toString()))
  );

  return beaconSet.size;
};

export const computeLargestDistance = (input: string): number => {
  const scanners = mapToScanners(input);
  const orientedScanners = getOrientedScanners(scanners);
  const pairs = unorderedPairs(orientedScanners);
  return pairs.reduce((max, [s1, s2]) => {
    return Math.max(max, s1.offset.manhattan(s2.offset));
  }, 0);
};

function getOrientedScanners(scanners: Array<Scanner>): Array<Scanner> {
  const pairs = unorderedPairs(scanners)
    .map(([scanner1, scanner2]) => new Pair(scanner1, scanner2))
    .filter((pair) => pair.overlap)
    .flatMap((pair) => [pair, pair.reverse()]);

  const rotations = createRotationMatrices();
  const oriented = new Set<number>([0]);

  while (oriented.size < scanners.length) {
    const pairIndex = pairs.findIndex(
      (p) => oriented.has(p.scanner1.id) && !oriented.has(p.scanner2.id)
    );
    const pair = pairs[pairIndex];
    pair.reorientScanner2(rotations);
    oriented.add(pair.scanner2.id);
    pairs.splice(pairIndex, 1);
  }

  return scanners;
}

function createRotationMatrices(): number[][][] {
  const rotationAngles: Array<number> = [0, 90, 180, 270].map((d) =>
    toRadians(d)
  );
  const xRotMatrices = rotationAngles.map((angle) => genXRotationMatrix(angle));
  const yRotMatrices = rotationAngles.map((angle) => genYRotationMatrix(angle));
  const zRotMatrices = rotationAngles.map((angle) => genZRotationMatrix(angle));

  const duplicates = new Set<string>();
  const rotations = xRotMatrices
    .flatMap((rx) => yRotMatrices.map((ry) => [rx, ry]))
    .flatMap(([rx, ry]) => zRotMatrices.map((rz) => [rx, ry, rz]))
    .map((t) => t.reduce((a, x) => multiply(a, x)))
    .filter((t) => !duplicates.has(t.join(";")) && duplicates.add(t.join(";")));

  return rotations;
}

function mapToScanners(input: string): Array<Scanner> {
  const scanners = Array<Scanner>();
  let scanner: Scanner | null = null;
  let scannerId = 0;

  for (const line of input.split("\n")) {
    if (line.startsWith("---")) {
      scanner = new Scanner(scannerId++);
      scanners.push(scanner);
      continue;
    }

    if (line.indexOf(",") > -1) {
      const p = line.split(",").map((n) => parseInt(n, 10));
      scanner!.beacons.push(new Point3d(p[0], p[1], p[2]));
    }
  }

  scanners.forEach((scanner) => scanner.populateRelativeDistances());
  return scanners;
}
