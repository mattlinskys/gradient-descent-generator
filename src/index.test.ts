import gradientDescentGenerator from "./index";

describe("Gradient descent generator", () => {
  test("Optimizes simple quadratic function y=x²", () => {
    let coefficient = 3;
    const optimize = gradientDescentGenerator([coefficient], (x) => x ** 2);

    for (const { coefficients } of optimize) {
      expect(coefficients[0]).toBeLessThan(coefficient);

      coefficient = coefficients[0];
    }

    expect(Math.abs(coefficient)).toBeLessThan(0.01);
  });

  test("Optimizes multivariate function z=x²+(y+1)²", () => {
    let coefficients = [2, 3];
    const optimize = gradientDescentGenerator(
      coefficients,
      (x, y) => x ** 2 + (y + 1) ** 2
    );

    for (const { coefficients: _coefficients } of optimize) {
      coefficients = _coefficients;
    }

    expect(Math.abs(coefficients[0])).toBeLessThan(0.01);
    expect(Math.abs(coefficients[0]) - 1).toBeLessThan(0.01);
  });
});
