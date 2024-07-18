const chance = require('chance').Chance();

export const newEmail = () => {
  return 'user_' + Date.now() + '@pirate.com';
};

export const signUpBody = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: newEmail(),
  password: '123456',
};
