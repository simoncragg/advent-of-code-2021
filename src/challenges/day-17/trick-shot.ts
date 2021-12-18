export const computeHighestY = (target: Region): number => {
  const maxBounds = 1000;
  let highestY = 0;
  for (let vx = 0; vx < maxBounds; vx++) {
    for (let vy = 0; vy < maxBounds; vy++) {
      const probe = {
        vx,
        vy,
        x: 0,
        y: 0,
        highestY: 0,
      };

      while (isAboveBottomTarget(probe, target)) {
        move(probe);
        if (isWithinTarget(probe, target)) {
          if (highestY < probe.highestY) {
            highestY = probe.highestY;
          }
          break;
        }
      }
    }
  }

  return highestY;
};

export const countAllDistinctInitialVelocitiesThatAreSuccessful = (
  target: Region
): number => {
  const maxBounds = 1000;
  let successCount = 0;
  for (let vx = -maxBounds; vx < maxBounds; vx++) {
    for (let vy = -maxBounds; vy < maxBounds; vy++) {
      const probe = {
        vx,
        vy,
        x: 0,
        y: 0,
        highestY: 0,
      };

      while (isAboveBottomTarget(probe, target)) {
        move(probe);
        if (isWithinTarget(probe, target)) {
          successCount++;
          break;
        }
      }
    }
  }

  return successCount;
};

function isAboveBottomTarget(probe: Probe, target: Region): boolean {
  return probe.y > target.botY;
}

function move(probe: Probe): void {
  probe.x += probe.vx;
  probe.y += probe.vy;

  if (probe.vx > 0) {
    probe.vx--;
  } else if (probe.vx < 0) {
    probe.vx++;
  }
  probe.vy--;

  if (probe.highestY < probe.y) {
    probe.highestY = probe.y;
  }
}

function isWithinTarget(probe: Probe, target: Region) {
  return (
    probe.x >= target.leftX &&
    probe.x <= target.rightX &&
    probe.y <= target.topY &&
    probe.y >= target.botY
  );
}
