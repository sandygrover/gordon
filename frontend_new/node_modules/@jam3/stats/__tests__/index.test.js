'use strict';

const stats = require('../src');

describe('Stats running', () => {
  test('test', () => {
    const errorOutput = 'Stats.js could not be loaded.';

    let output = '';
    function storeLog(inputs) {
      output += inputs;
    }
    console['warn'] = jest.fn(storeLog.bind(this));

    stats();

    expect(output).not.toBe(errorOutput);
  });
});
