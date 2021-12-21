import { Point3d } from "./Point3d";

export class Scanner {
  id: number;
  beacons: Array<Point3d>;
  relativeDistances: number[][];
  offset: Point3d;

  constructor(id: number) {
    this.id = id;
    this.beacons = Array<Point3d>();
    this.relativeDistances = Array<Array<number>>();
    this.offset = new Point3d(0, 0, 0);
  }

  populateRelativeDistances() {
    this.relativeDistances = this.beacons.map((b1) =>
      this.beacons
        .map((b2) => b1.manhattan(b2))
        .sort((a, b) => a - b)
        .slice(1)
    );
  }
}
