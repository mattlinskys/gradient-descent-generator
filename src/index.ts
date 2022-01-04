const dot = (v1: number[], v2: number[]) =>
  v1.reduce((scalar, _, i) => scalar + v1[i] * v2[i], 0);
const normalize = (v: number[]) => Math.sqrt(dot(v, v));

function* gradientDescentGenerator(
  init: number[],
  lambda: (...args: number[]) => number,
  maxIters = 50000,
  rate = 0.001,
  precision = 0.01
): IterableIterator<{
  coefficients: number[];
  slopes: number[];
  iter: number;
}> {
  let iter = 0;
  let coefficients = init.slice();
  let currentValue = lambda(...coefficients);

  while (iter < maxIters) {
    // Get slopes of next step
    const slopes = coefficients.map((_, i) => {
      const nextStep = coefficients.slice();
      nextStep[i] += rate * 10;
      const nextValue = lambda(...nextStep);

      return (nextValue - currentValue) / (nextStep[i] - coefficients[i]);
    });

    // Update coefficient in reverse direction of slope with specified rate
    coefficients = coefficients.map((a, i) => a + slopes[i] * -rate);
    currentValue = lambda(...coefficients);

    // Stop if all of slopes' theta come close to precision
    if (normalize(slopes) < precision) {
      break;
    }

    yield { coefficients, iter, slopes };
    iter++;
  }

  return coefficients;
}

export default gradientDescentGenerator;
