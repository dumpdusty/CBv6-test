import { expect } from 'chai';

describe('VERIFY SIMPLE MATH FUNCTIONS', () => {
  it('verify sum works properly', () => {
    expect(4 + 4).eq(8);
  });
});

const object = { a: 1, b: 'a', c: 3 };
const printHell = () => {
  console.log('HellYA!!');
};
