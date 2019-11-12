/* eslint-disable no-undef, no-underscore-dangle */

const assert = require('assert');
const templateRenderer = require('../../render/templateRenderer');

describe('Template Renderer', () => {
  it('should correctly render a simple document', () => {
    const handlebarsTemplate = 'Hello, my name is {{ name }}';
    const data = { name: 'Test' };
    const rendered = templateRenderer.render(handlebarsTemplate, data);

    const expected = 'Hello, my name is Test';
    assert.equal(rendered, expected);
  });
});
