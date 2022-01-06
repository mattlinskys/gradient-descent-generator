// funcation* generators needs global.regeneratorRuntime polyfill
import "regenerator-runtime/runtime";
import gradientDescentGenerator from "gradient-descent-generator";

let coefficient = 3;
const optimize = gradientDescentGenerator([coefficient], (x) => x ** 2);

for (const { coefficients } of optimize) {
  coefficient = coefficients[0];
}
console.log(coefficient);
