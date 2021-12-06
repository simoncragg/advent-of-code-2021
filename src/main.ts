import * as fs from "fs";
import {
  countIncreasedDepths,
  countSlidingWindowIncreasedDepths,
} from "./challenges/01-sonar-sweep";
import { dive, diveWithAim } from "./challenges/02-dive";
import {
  computeLifeSupportRating,
  computePowerConsumption,
} from "./challenges/03-binary-diagnostic";
import {
  computeWinningScore,
  computeLosingScore,
} from "./challenges/04-giant-squid";
import { computeOverlappingLinePoints } from "./challenges/05-hydrothermal-vents";
import {
  computePopulation1,
  computePopulation2,
} from "./challenges/06-lanternfish";

import { boardsData, generatedNumbers } from "./inputs/giant-squid-bingo";

runDay1();
runDay2();
runDay3();
runDay4();
runDay5();
runDay6();

function runDay1() {
  console.log("Day 1");
  var depths = loadInput("depths.txt")
    .split("\n")
    .map((depth) => parseInt(depth, 10));

  console.log(` Q1: ${countIncreasedDepths(depths)}`);
  console.log(` Q2: ${countSlidingWindowIncreasedDepths(depths, 3)}`);
  console.log();
}

function runDay2() {
  console.log("Day 2");
  const commands = loadInput("commands.txt").split("\n");
  const initialState = { horizontalPos: 0, depth: 0, aim: 0 };
  runDay2Question1(initialState, commands);
  runDay2Question2(initialState, commands);
  console.log();
}

function runDay2Question1(
  initialState: SubmarineState,
  commands: Array<string>
) {
  let endState = dive(initialState, commands);
  console.log(` Q1: ${endState.horizontalPos * endState.depth}`);
}

function runDay2Question2(
  initialState: SubmarineState,
  commands: Array<string>
) {
  const endState = diveWithAim(initialState, commands);
  console.log(` Q2: ${endState.horizontalPos * endState.depth}`);
}

function runDay3() {
  console.log("Day 3");
  const diagnostics = loadInput("diagnostics.txt")
    .split("\r\n")
    .map((b) => b.toString().trim());
  console.log(` Q1: ${computePowerConsumption(diagnostics)}`);
  console.log(` Q2: ${computeLifeSupportRating(diagnostics)}`);
  console.log();
}

function runDay4() {
  console.log("Day 4");
  console.log(` Q1: ${computeWinningScore(boardsData, generatedNumbers)}`);
  console.log(` Q2: ${computeLosingScore(boardsData, generatedNumbers)}`);
  console.log();
}

function runDay5() {
  console.log("Day 5");
  const hydrothermalVentLines = loadInput("hydrothermal-vents.txt").split("\n");
  console.log(
    ` Q1: ${computeOverlappingLinePoints(hydrothermalVentLines, false)}`
  );
  console.log(
    ` Q2: ${computeOverlappingLinePoints(hydrothermalVentLines, true)}`
  );
  console.log();
}

function runDay6() {
  console.log("Day 6");
  const initialPopulation = loadInput("lanternfish.txt")
    .split(",")
    .map((n) => parseInt(n, 10));
  console.log(` Q1: ${computePopulation1(80, initialPopulation)}`);
  console.log(` Q2: ${computePopulation2(256, initialPopulation)}`);
}

function loadInput(filename: string) {
  return fs.readFileSync(`inputs/${filename}`, "utf8");
}
