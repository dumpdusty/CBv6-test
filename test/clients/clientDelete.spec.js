import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as clientHelper from '../../helpers/clientHelper';

describe('DELETE CLIENT', () => {
    let res;
    describe('delete client POSITIVE', () => {
        before(async() => {

            const clientId = (await clientHelper.createClient(chance.name(), chance.phone())).body.payload

           res = await clientHelper.deleteClient(clientId)
        });

        it('verify status code', async () => {
            expect(res.status).to.eq(200);
        });
    });
});