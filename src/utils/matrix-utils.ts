export function genXRotationMatrix(rad: number) {
  return getIntMatrix([
    [1, 0, 0],
    [0, Math.cos(rad), -Math.sin(rad)],
    [0, Math.sin(rad), Math.cos(rad)],
  ]);
}

export function genYRotationMatrix(rad: number) {
  return getIntMatrix([
    [Math.cos(rad), 0, Math.sin(rad)],
    [0, 1, 0],
    [-Math.sin(rad), 0, Math.cos(rad)],
  ]);
}

export function genZRotationMatrix(rad: number) {
  return getIntMatrix([
    [Math.cos(rad), -Math.sin(rad), 0],
    [Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 1],
  ]);
}

export function getIntMatrix(matrix: number[][]) {
  return matrix.map((line) =>
    line.map((x) => (x < 0 ? Math.ceil(x) : Math.floor(x)))
  );
}

export function multiply(m1: number[][], m2: number[][]) {
  const height = m1.length;
  const width = m2[0].length;
  const result: Array<number>[] = Array(height)
    .fill(0)
    .map(() => Array(width));
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      result[row][col] = m1[row]
        .map((x1, i1) => x1 * m2[i1][col])
        .reduce((a, x) => a + x);
    }
  }

  return result;
}

export function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}
