const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non string values', () => {
    let fakeString = 123;
    expect(isRealString(fakeString) ).toBeFalsy();
  });

  it('should reject string with only spaces', () => {
    let fakeString = "    ";
    expect(isRealString(fakeString) ).toBeFalsy();
  });

  it('should allow string with non-space characters', () => {
    let realString = 'I am real';
    expect(isRealString(realString) ).toBeTruthy();
  });
});
