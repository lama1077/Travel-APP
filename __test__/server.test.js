const app = require('../src/server/server');
const supertest = require('supertest');

describe('The page should be running', () => {
  it('/', async () => {
   await supertest(app).get('/').expect(200);
  });
 });