export const computePolymerizationSum = (
  input: Array<string>,
  steps: number
): number => {
  const [polymerTemplate, pairInsertionRules] = mapInputs(input);

  let elementCount = getElementCount(polymerTemplate);
  let pairsToProcess = getPairsToProcess(polymerTemplate);

  for (let step = 0; step < steps; step++) {
    pairsToProcess = processPairs(
      pairsToProcess,
      elementCount,
      pairInsertionRules
    );
  }

  let mostCommon = Math.max(...Object.values(elementCount));
  let leastCommon = Math.min(...Object.values(elementCount));
  return mostCommon - leastCommon;
};

function processPairs(
  pairsToProcess: Record<string, number>,
  elementCount: Record<string, number>,
  pairInsertionRules: PairInsertionRule[]
): Record<string, number> {
  let newPairsToProcess: Record<string, number> = {};

  Object.entries(pairsToProcess).forEach((entity) => {
    let pair = entity[0];
    let qty = entity[1];
    newPairsToProcess[pair] = qty;
  });

  for (let { pair, elementToInsert } of pairInsertionRules) {
    if (!pairsToProcess[pair]) {
      continue;
    }

    let elementCountOffset = pairsToProcess[pair];
    addNewPairs(pair, elementToInsert, newPairsToProcess, elementCountOffset);

    if (elementCount[elementToInsert]) {
      elementCount[elementToInsert] += pairsToProcess[pair];
    } else {
      elementCount[elementToInsert] = 1;
    }
  }

  return newPairsToProcess;
}

function addNewPairs(
  pair: string,
  element: string,
  newPairsToProcess: Record<string, number>,
  elementCountOffset: number
) {
  newPairsToProcess[pair] -= elementCountOffset;

  var leftPair = `${pair[0]}${element}`;
  var rightPair = `${element}${pair[1]}`;

  if (newPairsToProcess[leftPair]) {
    newPairsToProcess[leftPair] += elementCountOffset;
  } else {
    newPairsToProcess[leftPair] = elementCountOffset;
  }

  if (newPairsToProcess[rightPair]) {
    newPairsToProcess[rightPair] += elementCountOffset;
  } else {
    newPairsToProcess[rightPair] = elementCountOffset;
  }
}

function getElementCount(polymerTemplate: string): Record<string, number> {
  const polymerElements = polymerTemplate.split("");
  var elementCount: Record<string, number> = {};
  polymerElements
    .filter((element, i, self) => self.indexOf(element) === i)
    .forEach(
      (element) =>
        (elementCount[element] = polymerElements.filter(
          (el) => el === element
        ).length)
    );
  return elementCount;
}

function getPairsToProcess(polymerTemplate: string): Record<string, number> {
  const pairsToProcess: Record<string, number> = {};
  const polymerElements = polymerTemplate.split("");
  for (var i = 0; i < polymerElements.length - 1; i++) {
    var pair = polymerTemplate.substring(i, i + 2);
    if (pairsToProcess[pair]) {
      pairsToProcess[pair] += 1;
    } else {
      pairsToProcess[pair] = 1;
    }
  }

  return pairsToProcess;
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
