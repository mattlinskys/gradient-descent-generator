// funcation* generators needs global.regeneratorRuntime polyfill
import "regenerator-runtime/runtime";
import gradientDescentGenerator from "gradient-descent-generator";

const WIDTH = 400;
const HALF_WIDTH = WIDTH / 2;
const HEIGHT = 400;
const HALF_HEIGHT = HEIGHT / 2;
const UNITS = 20;
const SLOPE_UNITS_LENGTH = 8;
const DPR = window.devicePixelRatio || 1;

const canvas = document.createElement("canvas");
canvas.width = WIDTH * DPR;
canvas.height = HEIGHT * DPR;

canvas.style.width = WIDTH + "px";
canvas.style.height = HEIGHT + "px";

document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
ctx.scale(DPR, DPR);

const lambda = (x) => (x + 1) ** 2 + 1;
const optimize = gradientDescentGenerator([3], lambda, 10_000, 0.005);

let coefficients;
let slopes;

const render = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  // X axis
  ctx.beginPath();
  ctx.moveTo(0, HALF_HEIGHT);
  ctx.lineTo(WIDTH, HALF_HEIGHT);
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Y axis
  ctx.beginPath();
  ctx.moveTo(HALF_WIDTH, 0);
  ctx.lineTo(HALF_WIDTH, HEIGHT);
  ctx.strokeStyle = "green";
  ctx.stroke();

  // Unit strokes
  for (let i = 0; i <= UNITS; i++) {
    const lineLength = 15;

    ctx.beginPath();
    ctx.moveTo((i * WIDTH) / UNITS, HALF_HEIGHT - lineLength / 2);
    ctx.lineTo((i * WIDTH) / UNITS, HALF_HEIGHT + lineLength / 2);
    ctx.strokeStyle = "red";
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(HALF_WIDTH - lineLength / 2, (i * HEIGHT) / UNITS);
    ctx.lineTo(HALF_WIDTH + lineLength / 2, (i * HEIGHT) / UNITS);
    ctx.strokeStyle = "green";
    ctx.stroke();
  }

  // Draw function
  ctx.beginPath();
  for (let i = 0; i <= UNITS; i += 0.25) {
    const x = i - UNITS / 2;
    const y = lambda(x);

    ctx.lineTo(x * UNITS + HALF_WIDTH, -y * UNITS + HALF_HEIGHT);
  }
  ctx.strokeStyle = "black";
  ctx.stroke();

  const { done, value } = optimize.next();
  if (!done) {
    coefficients = value.coefficients;
    slopes = value.slopes;
  }

  const [min] = coefficients;
  const y = lambda(min);
  const [slope] = slopes;
  const atan = Math.atan2(slope, 1);
  const cos = Math.cos(atan);
  const sin = Math.sin(atan);
  const halfSlope = SLOPE_UNITS_LENGTH / 2;

  // Draw slope
  ctx.beginPath();
  ctx.moveTo(
    (min - halfSlope * cos) * UNITS + HALF_WIDTH,
    (-y + halfSlope * sin) * UNITS + HALF_HEIGHT
  );
  ctx.lineTo(
    (min + halfSlope * cos) * UNITS + HALF_WIDTH,
    (-y - halfSlope * sin) * UNITS + HALF_HEIGHT
  );
  ctx.strokeStyle = "blue";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.lineWidth = 1;

  if (!done) {
    window.requestAnimationFrame(render);
  }
};

window.requestAnimationFrame(render);
