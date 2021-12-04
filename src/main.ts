import {
  countIncreasedDepths,
  countSlidingWindowIncreasedDepths,
} from "./challenges/01-sonar-sweep";

import { depths } from "./inputs/depths";

runDay1();

function runDay1() {
  console.log("Day 1");
  console.log(` Q1: ${countIncreasedDepths(depths)}`);
  console.log(` Q2: ${countSlidingWindowIncreasedDepths(depths, 3)}`);
  console.log();
}
