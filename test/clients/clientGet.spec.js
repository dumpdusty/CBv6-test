import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';

describe('GET CLIENT BY ID', () => {
  let res, resGet;
  let clientsList = [];

  after(async () => {
    for (let i = 0; i < clientsList.length; i++) {
      await clientHelper.deleteClient(clientsList[i]);
    }
  });

  describe('POSITIVE - Get client by id', () => {
    before(async () => {
      res = await clientHelper.createClient(clientHelper.clientData);
      clientsList.push(res.body.payload);
      const clientId = res.body.payload;
      resGet = await clientHelper.getClient(clientId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Get Client by id ok');
    });
    
    it('verify client has property name', async () => {
        expect(resGet.body.payload).to.haveOwnProperty('name');
    });

    it('verify client has property phone', async () => {
        expect(resGet.body.payload).to.haveOwnProperty('phone');
    });

    it('verify client name', async () => {
      expect(resGet.body.payload.name).to.eq(clientHelper.clientData.name);
    });

    it('verify client phone', async () => {
      expect(resGet.body.payload.phone).to.eq(clientHelper.clientData.phone);
    });

    it('verify client email', async () => {
      expect(resGet.body.payload.email).to.eq(clientHelper.clientData.email);
    });
  });

  describe('NEGATIVE - Get client with invalid id', () => {
    before(async () => {
      res = await clientHelper.createClient(clientHelper.clientData);
      clientsList.push(res.body.payload);
      const invalidClientId = res.body.payload + 'invalid';
      resGet = await clientHelper.getClient(invalidClientId);
    });

    it('verify status code', async () => {
      expect(resGet.status).to.eq(400);
    });

    it('verify response message', async () => {
      expect(resGet.body.message).to.eq('Client get error');
    });

    it('verify client name', async () => {
      expect(resGet.body.payload).not.haveOwnProperty('name');
    });

    it('verify client phone', async () => {
      expect(resGet.body.payload).not.haveOwnProperty('phone');
    });

    it('verify client email', async () => {
      expect(resGet.body.payload).not.haveOwnProperty('email');
    });
  });
});
