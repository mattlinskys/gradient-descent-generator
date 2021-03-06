# Gradient descent generator
Multivariable gradient descent using generator [function*](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) with no dependencies

### How to use

```js
import gradientDescentGenerator from 'gradient-descent-generator';

for (const { coefficients, slopes, iter } of gradientDescentGenerator([2, 3], (x, y) => x*x + y*y)) {
  console.log(coefficients, slopes, iter);
}
```

### Example in canvas `npm run example`

![Example](example/assets/example.gif)

### Arguments

```js
gradientDescentGenerator(
  init: number[],
  lambda: (...args: number[]) => number,
  maxIters = 50000,
  rate = 0.001,
  precision = 0.01
)
```
