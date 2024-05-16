import { expect } from 'chai';
import colors from 'colors';

describe('VERIFY SIMPLE MATH FUNCTIONS', () => {
  it('verify sum works properly', () => {
    expect(5 + 5).to.eq(10);
    console.log(colors.yellow('This test verify sum'));
    console.log('Hell'.green);
  });

  it('verify deduction works properly', () => {
    expect(5 - 5).to.eq(0);
    console.log(colors.red('This test verify deduction'));
  });

  it('verify multiply works properly', () => {
    expect(5 * 5).to.eq(25);
    console.log(colors.blue('This test verify multiply'));
  });

  it('verify division works properly', () => {
    expect(5 / 5).to.eq(1);
    console.log(colors.green('This test verify division'));
  });
});
