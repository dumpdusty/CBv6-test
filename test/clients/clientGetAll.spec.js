import request from 'supertest';
const chance = require('chance').Chance();
import { expect } from 'chai';
import * as Client from '../../helpers/clientHelper';

describe('GET ALL CLIENTS', () => {
    let res;
    describe('get all clients POSITIVE', () => {
        before(async() => {
            res = await Client.getAll()
        });

        it('verify status code', () => {
            expect(res.statusCode).to.eq(200)
        });
    });
});