const test = require('node:test');
const assert = require('node:assert');
const { generateDeleteKey } = require('./utils.js');

test('generateDeleteKey testing', async (t) => {
  await t.test('returns a string', () => {
    const key = generateDeleteKey();
    assert.strictEqual(typeof key, 'string', 'Expected returned key to be a string');
  });

  await t.test('returns a string of expected length', () => {
    const key = generateDeleteKey();
    assert.ok(key.length > 0, 'Expected length to be greater than 0');
    // Math.random().toString(36).substring(2, 15) usually returns up to 13 chars.
    // Two concatenated should be up to 26 chars. We check it's relatively long.
    assert.ok(key.length >= 10, 'Expected length to be reasonably long (>= 10)');
    assert.ok(key.length <= 30, 'Expected length to be bounded (<= 30)');
  });

  await t.test('generates unique keys', () => {
    const keys = new Set();
    const iterations = 1000;

    for (let i = 0; i < iterations; i++) {
      keys.add(generateDeleteKey());
    }

    // Check if we generated the same number of unique keys as iterations
    // (a collision in 1000 iterations is incredibly unlikely with this method)
    assert.strictEqual(keys.size, iterations, 'Expected to generate unique keys without collisions');
  });
});
