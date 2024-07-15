import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';

describe('DELETE CLIENT', () => {
  let res, resGet;
  describe('delete client POSITIVE', () => {
    before(async () => {
      const clientId = ( await clientHelper.createClient(clientHelper.clientData)).body.payload;
      res = await clientHelper.deleteClient(clientId);

      resGet = await clientHelper.getClient(clientId);
    });
    

    it('verify status code', async () => {
      expect(res.status).to.eq(200);
    });

    it('verify response message', async () => {
      expect(res.body.message).to.eq('Client deleted');
    });

    it('verify response message when get deleted client', async () => {
      expect(resGet.body.message).to.eq('No client for provided id');
    });
  });
});
