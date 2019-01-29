require('@babel/polyfill');
const request = require('supertest');
const knex = require('knex')(require('../knexfile').test);
const app = require('../server/app');
const db = require('../db/db.js');

describe('Testing Server', () => {
  beforeEach(async () => {
    await knex.migrate.rollback();
    await knex.migrate.latest();
    await knex.seed.run();
    const response = await db.getUserData(1);
  });

  afterEach(() => {});

  afterAll(async () => {
    await db.db.destroy();
    await knex.destroy();
  });

  test('It should handle GET requests for users', async done => {
    const response = await request(app).get('/api/users/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].userId).toEqual(1);
    expect(response.body[0].username).toEqual('OG User');
    done();
  });

  // test('It should handle POST requests to comments service', () =>
  //   request(app)
  //     .post('/comments')
  //     .then(response => {
  //       expect(response.statusCode).toEqual(201);
  //     }));

  // test("It should handle GET requests to projects service", () => {
  //   return request(app)
  //     .get("/projects/108")
  //     .then(response => {
  //       expect(response.statusCode).toEqual(200);
  //       expect(response.body).toEqual("success");
  //     });
  // });

  // test("It should handle GET requests to pledges service", () => {
  //   return request(app)
  //     .get("/pledges/108")
  //     .then(response => {
  //       expect(response.statusCode).toEqual(200);
  //       expect(response.body).toEqual("success");
  //     });
  // });

  // test("It should handle POST requests to pledges service", () => {
  //   return request(app)
  //     .post("/pledges")
  //     .then(response => {
  //       expect(response.statusCode).toEqual(201);
  //     });
  // });

  // test("It should handle GET requests to related service", () => {
  //   return request(app)
  //     .get("/related/108")
  //     .then(response => {
  //       expect(response.statusCode).toEqual(200);
  //       expect(response.body).toEqual("success");
  //     });
  // });
});
