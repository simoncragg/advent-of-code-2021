import {
  countIncreasedDepths,
  countSlidingWindowIncreasedDepths,
} from "./challenges/01-sonar-sweep";
import { dive, diveWithAim } from "./challenges/02-dive";
import {
  computeLifeSupportRating,
  computePowerConsumption,
} from "./challenges/03-binary-diagnostic";

import { depths } from "./inputs/depths";
import { commands } from "./inputs/commands";
import { diagnostics } from "./inputs/diagnostics";

runDay1();
runDay2();
runDay3();

function runDay1() {
  console.log("Day 1");
  console.log(` Q1: ${countIncreasedDepths(depths)}`);
  console.log(` Q2: ${countSlidingWindowIncreasedDepths(depths, 3)}`);
  console.log();
}

function runDay2() {
  console.log("Day 2");
  const initialState = { horizontalPos: 0, depth: 0, aim: 0 };
  runDay2Question1(initialState);
  runDay2Question2(initialState);
  console.log();
}

function runDay2Question1(initialState: SubmarineState) {
  let endState = dive(initialState, commands);
  console.log(` Q1: ${endState.horizontalPos * endState.depth}`);
}

function runDay2Question2(initialState: SubmarineState) {
  const endState = diveWithAim(initialState, commands);
  console.log(` Q2: ${endState.horizontalPos * endState.depth}`);
}

function runDay3() {
  console.log("Day 3");
  console.log(` Q1: ${computePowerConsumption(diagnostics)}`);
  console.log(` Q2: ${computeLifeSupportRating(diagnostics)}`);
  console.log();
}
