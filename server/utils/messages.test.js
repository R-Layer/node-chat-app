const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./messages');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let lat = 40;
    let lng = 40;

    let response = generateLocationMessage('Admin', lat, lng);

    expect(response.url).toBe('https://www.google.com/maps?q=40,40');
    expect(typeof response.createdAt).toBe('number');
  });
});
