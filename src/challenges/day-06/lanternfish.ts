export const computePopulation1 = function (
  totalDays: number,
  initialPopulation: Array<number>
): number {
  let population = [...initialPopulation];

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    const spawnedFish: Array<number> = [];
    for (let i = 0; i < population.length; i++) {
      population[i]--;
      if (population[i] == -1) {
        population[i] = 6;
        spawnedFish.push(8);
      }
    }
    population = [...population, ...spawnedFish];
    // console.log(
    //   `After  ${day} days: ${JSON.stringify(
    //     population.map((lanternfish) => lanternfish.daysTillSpawn)
    //   )}`
    // );
  }
  return population.length;
};

export const computePopulation2 = function (
  totalDays: number,
  initialPopulation: Array<number>
): number {
  let populationHash = Array<number>(9).fill(0);
  for (const fish of initialPopulation) {
    populationHash[fish] += 1;
  }

  for (let dayIndex = 0; dayIndex < totalDays; dayIndex++) {
    let newHash = Array<number>(9).fill(0);
    for (let i = 1; i < populationHash.length; i++) {
      newHash[i - 1] = populationHash[i];
    }

    newHash[8] = populationHash[0];
    newHash[6] += populationHash[0];

    populationHash = newHash;
  }

  return populationHash.reduce((a, b) => a + b, 0);
};
