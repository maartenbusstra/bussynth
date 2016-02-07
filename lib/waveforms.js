const TWO_PI = 2 * Math.PI;

export function sine(phase) {
  return Math.sin(TWO_PI * phase);
}

export function square(phase) {
  return Math.floor(Math.sin(TWO_PI * phase));
}

export function triangle(phase) {
  return Math.abs(
    2 * (phase / Math.PI - Math.floor(phase / Math.PI + 1 / 2))
  ) * 2 - 1;
}

export function sawTooth(phase) {
  return 2 * (phase / Math.PI - Math.floor(phase / Math.PI + 1 / 2));
}
