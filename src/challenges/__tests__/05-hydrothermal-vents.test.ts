import { computeOverlappingLinePoints } from "../05-hydrothermal-vents";

describe("hydrothermal vents", () => {
  const hydrothermalVentLines = [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    " 9,4 -> 3,4",
    "2,2 -> 2, 1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 ->  2,9",
    "3,4 -> 1,4",
    "0, 0 -> 8,8",
    "5,5 -> 8,2",
  ];

  it("computeOverlappingLinePoints excluding diagonals returns 5", () => {
    expect(computeOverlappingLinePoints(hydrothermalVentLines, false)).toEqual(
      5
    );
  });

  it("computeOverlappingLinePoints including diagonals returns 12", () => {
    expect(computeOverlappingLinePoints(hydrothermalVentLines, true)).toEqual(
      12
    );
  });
});
