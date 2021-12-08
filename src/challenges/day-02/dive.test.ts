import { dive, diveWithAim, mapToCommand } from "./dive";
import { readFile } from "../../utils/file-util";

describe("Day 2", () => {
  const initialState = { horizontalPos: 0, depth: 0, aim: 0 };

  describe("dive", () => {
    it.each([
      ["example.txt", 150],
      ["challenge.txt", 2019945],
    ])(
      "must return a result whose horizontal pos * depth is %p",
      (filename: string, expected: number) => {
        const commands = readFile(`input/day-02/${filename}`).split("\n");
        const endState = dive(initialState, commands);
        expect(endState.horizontalPos * endState.depth).toEqual(expected);
      }
    );
  });

  describe("diveWithAim", () => {
    it.each([
      ["example.txt", 900],
      ["challenge.txt", 1599311480],
    ])(
      "must return a result whose horizontalPos * depth is %p",
      (filename: string, expected: number) => {
        const commands = readFile(`input/day-02/${filename}`).split("\n");
        const endState = diveWithAim(initialState, commands);
        expect(endState.horizontalPos * endState.depth).toEqual(expected);
      }
    );
  });

  describe("mapToCommand", () => {
    test.each([
      ["forward 5", { direction: "forward", steps: 5 }],
      ["uP 12", { direction: "up", steps: 12 }],
      ["Down 200", { direction: "down", steps: 200 }],
    ])(
      "given %p must return %p",
      (commandText: string, expectedCommand: Command) => {
        const command = mapToCommand(commandText);
        expect(command.direction).toEqual(expectedCommand.direction);
        expect(command.steps).toEqual(expectedCommand.steps);
      }
    );
  });
});
