export class Point3d {
  constructor(public x: number, public y: number, public z: number) {}

  add(p: Point3d): Point3d {
    return new Point3d(this.x + p.x, this.y + p.y, this.z + p.z);
  }

  sub(p: Point3d): Point3d {
    return new Point3d(this.x - p.x, this.y - p.y, this.z - p.z);
  }

  manhattan(p: Point3d): number {
    return (
      Math.abs(this.x - p.x) + Math.abs(this.y - p.y) + Math.abs(this.z - p.z)
    );
  }

  equal(p: Point3d): boolean {
    return this.x === p.x && this.y === p.y && this.z === p.z;
  }

  toString(): string {
    return `${this.x},${this.y},${this.z}`;
  }

  vector(): number[][] {
    return [[this.x], [this.y], [this.z]];
  }

  static createFromVector(vector: number[][]): Point3d {
    const [[x], [y], [z]] = vector;
    return new Point3d(x, y, z);
  }
}
