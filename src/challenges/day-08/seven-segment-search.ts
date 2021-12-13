import { arraysEqual } from "../../utils/array-utils";

export function countUniqueOutputInstances(input: Array<string>): number {
  const outputs = input.map((s) => s.split("|")[1].trim());

  let uniqueInstances = Array<string>();

  for (const line of outputs) {
    const digits = line.split(" ").map((s) => s.trim());
    for (const digit of digits) {
      if ([2, 3, 4, 7].indexOf(digit.length) > -1) {
        uniqueInstances.push(digit);
      }
    }
  }

  return uniqueInstances.length;
}

export function decodeNumber(input: Array<string>): number {
  let count = 0;

  for (const line of input) {
    const parts = line.split("|").map((s) => s.trim());
    const inputs = parts[0].split(" ").map((s) => s.trim());
    const outputs = parts[1].split(" ").map((s) => s.trim());

    let numbers = buildNumberMap(inputs);

    let outputNum = "";
    for (let output of outputs) {
      let num = getNumber(output);
      const value = getHashMapValue(numbers, num);
      outputNum += value;
    }

    let integer = parseInt(outputNum, 10);
    count += integer;
  }

  return count;
}

function buildNumberMap(inputs: Array<string>): Map<Array<number>, string> {
  let numbers = new Map<Array<number>, string>();
  let numbersRev = new Map<string, Array<number>>();

  let fiveSeg = Array<Array<number>>();
  let sixSeg = Array<Array<number>>();

  for (const number of inputs) {
    if (number.length === 2) {
      numbers.set(getNumber(number), "1");
      numbersRev.set("1", getNumber(number));
    } else if (number.length === 3) {
      numbers.set(getNumber(number), "7");
      numbersRev.set("7", getNumber(number));
    } else if (number.length === 4) {
      numbers.set(getNumber(number), "4");
      numbersRev.set("4", getNumber(number));
    } else if (number.length === 7) {
      numbers.set(getNumber(number), "8");
      numbersRev.set("8", getNumber(number));
    } else if (number.length == 5) {
      fiveSeg.push(getNumber(number));
    } else if (number.length == 6) {
      sixSeg.push(getNumber(number));
    }
  }

  let findNine = getVal(numbersRev, "7");
  subtract(findNine, getVal(numbersRev, "1"));
  add(findNine, getVal(numbersRev, "4"));
  const nine = findClosest(sixSeg, findNine);

  numbers.set(nine, "9");
  numbersRev.set("9", nine);
  sixSeg.splice(sixSeg.indexOf(nine), 1);

  let findFive = [...nine];
  subtract(findFive, getVal(numbersRev, "1"));
  let five = findClosest(fiveSeg, findFive);

  numbers.set(five, "5");
  numbersRev.set("5", five);
  fiveSeg.splice(fiveSeg.indexOf(five), 1);

  let findThree = getVal(numbersRev, "5");
  subtract(findThree, getVal(numbersRev, "4"));
  add(findThree, getVal(numbersRev, "1"));
  let three = findClosest(fiveSeg, findThree);

  numbers.set(three, "3");
  numbersRev.set("3", three);
  fiveSeg.splice(fiveSeg.indexOf(three), 1);

  let two = fiveSeg[0];
  numbers.set(two, "2");
  numbersRev.set("2", two);
  fiveSeg.splice(fiveSeg.indexOf(two), 1);

  let findZero = getVal(numbersRev, "2");
  subtract(findZero, getVal(numbersRev, "4"));
  add(findZero, getVal(numbersRev, "1"));
  let zero = findClosest(sixSeg, findZero);

  numbers.set(zero, "0");
  numbersRev.set("0", zero);
  sixSeg.splice(sixSeg.indexOf(zero), 1);

  let six = sixSeg[0];
  numbers.set(six, "6");
  numbersRev.set("6", six);
  sixSeg.splice(sixSeg.indexOf(six), 1);

  return numbers;
}

function findClosest(values: Array<Array<number>>, num: Array<number>) {
  let smallest = 7;
  let smallestNum = Array<number>(7);
  for (let v of values) {
    let val = 0;
    for (let i = 0; i < 7; i++) {
      val += v[i] - num[i] > 0 ? 1 : 0;
    }
    if (val < smallest) {
      smallestNum = v;
      smallest = val;
    }
  }
  return smallestNum;
}

function add(a: Array<number>, b: Array<number>) {
  for (let i = 0; i < 7; i++) {
    a[i] += b[i];
    a[i] = Math.min(a[i], 1);
  }
}

function subtract(a: Array<number>, b: Array<number>) {
  for (let i = 0; i < 7; i++) {
    a[i] -= b[i];
    a[i] = Math.max(a[i], 0);
  }
}

function getHashMapValue(
  map: Map<Array<number>, string>,
  val: Array<number>
): string {
  const iterator = map.entries();

  while (true) {
    const entry = iterator.next();

    if (entry.value === undefined) {
      return "";
    }

    if (arraysEqual(entry.value[0], val)) {
      return entry.value[1];
    }
  }
}

function getNumber(num: string): Array<number> {
  let numArr = Array<number>(7).fill(0);
  for (const s of num.split("")) {
    switch (s) {
      case "a":
        numArr[0] = 1;
        break;
      case "b":
        numArr[1] = 1;
        break;
      case "c":
        numArr[2] = 1;
        break;
      case "d":
        numArr[3] = 1;
        break;
      case "e":
        numArr[4] = 1;
        break;
      case "f":
        numArr[5] = 1;
        break;
      case "g":
        numArr[6] = 1;
        break;
    }
  }
  return numArr;
}

function getVal(
  numbersRev: Map<string, Array<number>>,
  num: string
): Array<number> {
  let numArr = numbersRev.get(num) as Array<number>;
  return [...numArr];
}
