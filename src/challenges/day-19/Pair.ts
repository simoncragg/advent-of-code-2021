import { Overlap } from "./Overlap";
import { Scanner } from "./Scanner";
import { Point3d } from "./Point3d";
import { multiply } from "../../utils/matrix-utils";
import { intersectSorted } from "../../utils/array-utils";

export class Pair {
  private overlapThreshold: number = 12;

  scanner1: Scanner;
  scanner2: Scanner;
  overlap: Overlap | false;

  constructor(scanner1: Scanner, scanner2: Scanner) {
    this.scanner1 = scanner1;
    this.scanner2 = scanner2;
    this.overlap = this.getOverlap();
  }

  reverse(): Pair {
    const reverseOverlap =
      this.overlap instanceof Overlap
        ? (this.overlap as Overlap).reverse()
        : false;

    let reversedPair = new Pair(this.scanner2, this.scanner1);
    reversedPair.overlap = reverseOverlap;
    return reversedPair;
  }

  reorientScanner2(rotationMatrices: number[][][]): boolean {
    const { beacon1Index, beacon2Index } = this.overlap as Overlap;
    const beacon1 = this.scanner1.beacons[beacon1Index];
    for (const rotation of rotationMatrices) {
      const rotatedBeacons = this.scanner2.beacons.map((p) =>
        Point3d.createFromVector(multiply(rotation, p.vector()))
      );
      const offset = beacon1.sub(rotatedBeacons[beacon2Index]);
      const offsetBeacons = rotatedBeacons.map((beacon) => beacon.add(offset));

      const overlapCount = offsetBeacons.reduce(
        (acc, beacon) =>
          acc +
          (this.scanner1.beacons.some((s1p) => s1p.equal(beacon)) ? 1 : 0),
        0
      );

      if (overlapCount >= this.overlapThreshold) {
        this.scanner2.beacons = offsetBeacons;
        this.scanner2.offset = offset;
        return true;
      }
    }

    return false;
  }

  private getOverlap(): Overlap | false {
    for (let i = 0; i < this.scanner1.relativeDistances.length; i++) {
      const r1 = this.scanner1.relativeDistances[i];
      for (let j = 0; j < this.scanner2.relativeDistances.length; j++) {
        const r2 = this.scanner2.relativeDistances[j];
        const overlap = intersectSorted(r1, r2);
        if (overlap.length >= this.overlapThreshold - 1) {
          return new Overlap(i, j);
        }
      }
    }

    return false;
  }
}
