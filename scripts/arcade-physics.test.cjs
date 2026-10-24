const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const file = path.resolve(__dirname, '../app/tools/game/components/arcade-physics.ts');
const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const loaded = new Module(file, module); loaded.filename = file; loaded.paths = module.paths;
loaded._compile(compiled, file);
const { bounceOffBrick, bounceOffFlipper } = loaded.exports;

test('side of brick reflects horizontal velocity and separates ball', () => {
  const ball = { x: 97, y: 110, vx: 4, vy: 1, radius: 7 };
  assert.equal(bounceOffBrick(ball, { x: 100, y: 100, w: 50, h: 20 }), true);
  assert.ok(ball.vx < 0); assert.equal(ball.vy, 1); assert.ok(ball.x < 94);
  assert.equal(bounceOffBrick(ball, { x: 100, y: 100, w: 50, h: 20 }), false);
});
test('ball moving away from brick cannot score another hit', () => {
  const ball = { x: 97, y: 110, vx: -4, vy: 1, radius: 7 };
  assert.equal(bounceOffBrick(ball, { x: 100, y: 100, w: 50, h: 20 }), false);
});
test('pinball does not hit an invisible rectangle above the flipper', () => {
  const ball = { x: 130, y: 447, vx: 0, vy: 5, r: 7 };
  assert.equal(bounceOffFlipper(ball, 110, 480, 168, 480, true, 1), false);
  assert.equal(ball.vy, 5);
});
test('contact with raised flipper sends ball up and toward center', () => {
  const ball = { x: 135, y: 474, vx: 0, vy: 5, r: 7 };
  assert.equal(bounceOffFlipper(ball, 110, 480, 168, 480, true, 1), true);
  assert.ok(ball.vy < 0); assert.ok(ball.vx > 0);
});
