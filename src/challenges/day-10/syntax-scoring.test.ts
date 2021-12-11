import {
  computeErrorScore,
  getLineCompletions,
  computeMiddleAutoCompleteScore,
} from "./syntax-scoring";
import { readFile } from "../../utils/file-util";

describe("syntax scoring", () => {
  describe("computeErrorScore", () => {
    it.each([
      ["[({(<(())[]>[[{[]{<()<>>", 0],
      ["[(()[<>])]({[<{<<[]>>(", 0],
      ["{([(<{}[<>[]}>{[]{[(<()>", 1197],
      ["[[<[([]))<([[{}[[()]]]", 3],
      ["[{[{({}]{}}([{[{{{}}([]", 57],
      ["{<[[]]>}<{[{[{[]{()[[[]", 0],
      ["[<(<(<(<{}))><([]([]()", 3],
      ["<{([([[(<>()){}]>(<<{{", 25137],
      ["<{([{{}}[<[[[<>{}]]]>[]]", 0],
    ])("given line %p returns %p", (line: string, expected) => {
      expect(computeErrorScore([line])).toEqual(expected);
    });

    it.each([
      ["example.txt", 26397],
      ["challenge.txt", 268845],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const lines = readFile(`input/day-10/${filename}`)
          .split("\n")
          .map((s) => s.trim());

        expect(computeErrorScore(lines)).toEqual(expected);
      }
    );
  });

  describe("completeLines", () => {
    it.each([["[({(<(())[]>[[{[]{<()<>>", "}}]])})]"]])(
      "given line %p returns %p",
      (line: string, expected: string) => {
        expect(getLineCompletions([line])[0]).toEqual(expected);
      }
    );
  });

  describe("computeMiddleAutoCompleteScore", () => {
    it.only.each([
      ["example.txt", 288957],
      ["challenge.txt", 4038824534],
    ])(
      "when passed %p input, returns %p",
      (filename: string, expected: number) => {
        const lines = readFile(`input/day-10/${filename}`)
          .split("\n")
          .map((s) => s.trim());

        expect(computeMiddleAutoCompleteScore(lines)).toEqual(expected);
      }
    );
  });
});
