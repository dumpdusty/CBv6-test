const chance = require('chance').Chance();
import * as user from './userHelper';

export const newEmail = () => {
  return 'user_' + Date.now() + '@pirate.com';
};

export const signUpBody = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: newEmail(),
  password: '123456',
};

export const userId = async () => {
  return (await user.login(user.userData.email, user.userData.password)).body.payload.userId; 
}