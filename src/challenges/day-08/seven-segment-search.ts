export function countUniqueOutputInstances(input: Array<string>): number {
  const outputs = input.map((s) => s.split("|")[1].trim());

  let uniqueInstances = Array<string>();

  let digits = Array<Digit>();
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
