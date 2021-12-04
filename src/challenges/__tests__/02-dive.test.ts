import { dive, diveWithAim, mapToCommand } from "../02-dive";

describe("Day 2", () => {
  const commands = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2",
  ];

  const initialState = { horizontalPos: 0, depth: 0, aim: 0 };

  describe("dive", () => {
    it("must return a result whose horizontal pos * depth is 150", () => {
      const endState = dive(initialState, commands);
      expect(endState.horizontalPos * endState.depth).toEqual(150);
    });
  });

  describe("diveWithAim", () => {
    it("must return a result whose horizontalPos * depth is 900", () => {
      const endState = diveWithAim(initialState, commands);
      expect(endState.horizontalPos * endState.depth).toEqual(900);
    });
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
