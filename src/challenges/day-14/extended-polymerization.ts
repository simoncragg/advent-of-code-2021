export const computePolymerizationSum = (
  input: Array<string>,
  steps: number
): number => {
  const polymer = performPolymerization(input, steps);
  const elementStats = polymer
    .split("")
    .filter((element, i, self) => self.indexOf(element) === i)
    .map((element) => {
      return { element, quantity: 0 } as any;
    });

  for (let stat of elementStats) {
    stat.quantity = polymer.split("").filter((el) => el == stat.element).length;
  }

  const orderedStats = elementStats.sort((a, b) => a.quantity - b.quantity);
  const mostCommonElement = orderedStats[orderedStats.length - 1];
  const leastCommonElement = orderedStats[0];

  console.log(orderedStats);

  return mostCommonElement.quantity - leastCommonElement.quantity;
};

export function performPolymerization(
  input: Array<string>,
  steps: number
): string {
  const [polymerTemplate, pairInsertionRules] = mapInputs(input);

  console.log(polymerTemplate);
  console.log("-----------------------");
  console.log(pairInsertionRules);

  let polymer = cloneString(polymerTemplate);
  for (let step = 0; step < steps; step++) {
    polymer = extendPolymer(polymer, pairInsertionRules);
  }

  console.log(polymer);
  return polymer;
}

// NNCB
export function extendPolymer(
  polymer: string,
  pairInsertionRules: Array<PairInsertionRule>
): string {
  const pairs = getPairs(polymer);
  const extendedPairs = pairs.map((pair) =>
    extendPair(pair, pairInsertionRules)
  );
  let newPolymer = extendedPairs[0];
  for (let i = 1; i < extendedPairs.length; i++) {
    const toAppend =
      extendedPairs[i].length === 3
        ? extendedPairs[i].substring(1, 3)
        : extendedPairs[i];

    newPolymer += toAppend;
  }
  return newPolymer;
}

function getPairs(polymer: string): Array<string> {
  let pairs = Array<string>();
  for (let i = 0; i < polymer.length - 1; i += 1) {
    pairs.push(`${polymer[i]}${polymer[i + 1]}`);
  }
  return pairs;
}

function extendPair(
  pair: string,
  pairInsertionRules: Array<PairInsertionRule>
): string {
  const pairInsertionRule = pairInsertionRules.find(
    (rule) => rule.pair === pair
  );
  return pairInsertionRule
    ? `${pair[0]}${pairInsertionRule.elementToInsert}${pair[1]}`
    : pair;
}

export function mapInputs(
  input: Array<string>
): [string, Array<PairInsertionRule>] {
  const polymerTemplate = input[0].toString();
  const pairInsertionRules = Array<PairInsertionRule>();
  for (let i = 2; i < input.length - 1; i++) {
    const ruleParts = input[i].split("->").map((s) => s.trim());
    pairInsertionRules.push({
      pair: ruleParts[0].trim(),
      elementToInsert: ruleParts[1].trim(),
    });
  }
  return [polymerTemplate, pairInsertionRules];
}

function cloneString(polymer: string) {
  return (" " + polymer).slice(1);
}
