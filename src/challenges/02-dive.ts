export const dive = (
  initialState: SubmarineState,
  commandDescriptions: Array<string>
): SubmarineState => {
  const submarineState = {
    horizontalPos: initialState.horizontalPos,
    depth: initialState.depth,
    aim: initialState.aim,
  };
  const commands = commandDescriptions.map(mapToCommand);
  commands.forEach((command) => {
    switch (command.direction) {
      case "forward":
        submarineState.horizontalPos += command.steps;
        break;
      case "up":
        submarineState.depth -= command.steps;
        break;
      case "down":
        submarineState.depth += command.steps;
        break;
      default:
        throw new Error(
          `${command.direction} is not a recognised command name`
        );
    }
  });
  return submarineState;
};

export const diveWithAim = (
  initialState: SubmarineState,
  commandDescriptions: Array<string>
): SubmarineState => {
  const submarineState = {
    horizontalPos: initialState.horizontalPos,
    depth: initialState.depth,
    aim: initialState.aim,
  };
  const commands = commandDescriptions.map(mapToCommand);
  commands.forEach((command) => {
    switch (command.direction) {
      case "forward":
        submarineState.horizontalPos += command.steps;
        submarineState.depth += submarineState.aim * command.steps;
        break;
      case "up":
        submarineState.aim -= command.steps;
        break;
      case "down":
        submarineState.aim += command.steps;
        break;
      default:
        throw new Error(
          `${command.direction} is not a recognised command name`
        );
    }
  });
  return submarineState;
};

export const mapToCommand = (commandDescription: string): Command => {
  const parts = commandDescription.split(" ");
  return { direction: parts[0].toLowerCase(), steps: parseInt(parts[1]) };
};
