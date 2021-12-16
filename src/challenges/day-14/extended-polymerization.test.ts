import { computePolymerizationSum } from "./extended-polymerization";
import { readFile } from "../../utils/file-util";

describe("computePolymerizationSum", () => {
  it.only.each([
    ["example.txt", 10, 1588],
    ["challenge.txt", 10, 2321],
    ["challenge.txt", 40, 2399822193707],
  ])(
    "when passed %p with %p steps returns %p",
    (filename: string, steps: number, expected: number) => {
      const input = readFile(`input/day-14/${filename}`).split("\r\n");
      expect(computePolymerizationSum(input, steps)).toEqual(expected);
    }
  );
});
