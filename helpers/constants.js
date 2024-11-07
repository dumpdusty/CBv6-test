import * as serviceHelper from './serviceHelper';
import * as vendorHelper from './vendorHelper';
import * as user from './userHelper';
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

export const vendorId = async () => {
 return (await vendorHelper.createVendor(vendorHelper.vendorData)).body.payload;
}

export const serviceId = async () => {
  return (await serviceHelper.createService(serviceHelper.serviceData(await vendorId()))).body.payload;
};

export const userId = async () => {
  return (await user.login(user.userData.email, user.userData.password)).body.payload.userId; 
}

export const companyId = async () => {
  return (await user.getUser(await user.userId())).body.payload.companyAccount._id; 
}