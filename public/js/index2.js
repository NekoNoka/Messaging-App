const IMPORTS = (function () {
  var c;
  var ctx;
  var defaultFill = "#000000";
  var defaultStroke = "#000000";

  function startup() {
    fill(defaultFill);
    stroke(defaultStroke);
  }

  function line(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }

  function rect(x1, y1, x2, y2) {
    ctx.fillRect(x1, y1, x2, y2);
  }

  function stroke(s) {
    ctx.strokeStyle = s;
  }

  function fill(f) {
    defaultFill = f;
    ctx.fillStyle = f;
  }

  function background(color) {
    fill(color);
    rect(0, 0, c.width, c.height);
    fill(defaultFill);
  }

  function createCanvas(width, height) {
    c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    ctx = c.getContext("2d");
    document.body.appendChild(c);
    startup();
  }

  return {
    line,
    circle,
    rect,
    stroke,
    fill,
    background,
    createCanvas
  }
})();

const { line, circle, rect, stroke, fill, background, createCanvas } = IMPORTS;

function setup() {
  createCanvas(500, 500);
  fill("#ffff00");
}

function draw() {
  background(220);
  stroke("#ff0000");
  line(0, 0, 200, 100);
}

setup();

setInterval(draw, 1000 / 60);