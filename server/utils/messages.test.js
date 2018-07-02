const expect = require('expect');
const { generateMessage } = require('./messages');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let sender = 'Admin';
    let text = 'I am THE Admin';

    let response = generateMessage(sender, text);

    // expect(response.from).toBe(sender);
    // expect(response.text).toBe(text);
    expect(typeof response.createdAt).toBe('number');
    expect(response).toMatchObject({from:sender, text});
  });
});
