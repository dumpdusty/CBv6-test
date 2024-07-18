const chance = require('chance').Chance();
import * as vendorHelper from './vendorHelper'

export const newEmail = () => {
  return 'user_' + Date.now() + '@pirate.com';
};

export const signUpBody = {
  firstName: chance.first(),
  lastName: chance.last(),
  email: newEmail(),
  password: '123456',
};

export const vendorId = async () => {
  return (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload;
}
