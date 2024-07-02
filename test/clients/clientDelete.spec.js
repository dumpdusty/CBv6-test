import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as Client from '../../helpers/clientHelper';

describe('DELETE CLIENT', () => {
    let res;
    describe('delete client POSITIVE', () => {
        before(async() => {

            const clientId = (await Client.create(chance.name(), chance.phone())).body.payload

           res = await Client.deleteSingle(clientId)
        });

        it('verify status code', async () => {
            expect(res.status).to.eq(200);
        });
    });
});