import {
  countDotsAfterOneFold,
  countDotsAfterAllFolds,
} from "./transparent-origami";
import { readFile } from "../../utils/file-util";

describe("transparent origami", () => {
  it.each([
    ["example-1a.txt", 17],
    ["challenge-1.txt", 847],
  ])("when passed %p, returns %p", (filename: string, expected: number) => {
    const inputLines = readFile(`input/day-13/${filename}`)
      .split("\n")
      .map((s) => s.trim());

    expect(countDotsAfterOneFold(inputLines)).toEqual(expected);
  });

  it.each([["example-1b.txt", 17]])(
    "when passed %p, returns %p",
    (filename: string, expected: number) => {
      const inputLines = readFile(`input/day-13/${filename}`)
        .split("\n")
        .map((s) => s.trim());

      expect(countDotsAfterAllFolds(inputLines)).toEqual(expected);
    }
  );
});
