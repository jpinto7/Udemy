const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Andy Kaufman';
    const text = 'Hey there';
    const message = generateMessage(from, text);
    expect(message).toMatchObject({
      from,
      text
    });
    expect(typeof message.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'Andy Kaufman';
    const latitude = 24;
    const longitude = 15;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    const message = generateLocationMessage(from, latitude, longitude);
    expect(message).toMatchObject({
      from,
      url 
    });
    expect(typeof message.createdAt).toBe('number');
  })
});