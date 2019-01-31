require('@babel/polyfill');
const request = require('supertest');
const knex = require('../db/knex');
const app = require('../server/app');
// const db = require('../db/db.js');

describe('Testing Server', () => {
  beforeEach(async done => {
    try {
      await knex.migrate.rollback();
      await knex.migrate.latest();
      await knex.seed.run();
      done();
    } catch (err) {
      console.log(err);
    }
  });

  afterAll(async done => {
    await knex.destroy();
    done();
  });

  test('It should handle GET  requests to users table', async done => {
    const response = await request(app).get('/api/users/1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].userId).toEqual(1);
    expect(response.body[0].username).toEqual('OG User');
    done();
  });

  test('It should handle POST requests to users table', async done => {
    let response = await request(app)
      .post('/api/users')
      .send({
        username: 'testname',
        handle: '@testhandle',
        numMessages: 0,
        profilePic: 'testpic'
      });
    expect(response.statusCode).toEqual(201);
    response = await request(app).get('/api/users/2');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].userId).toEqual(2);
    expect(response.body[0].username).toEqual('testname');
    done();
  });

  test('It should handle GET  requests to chatrooms table', async done => {
    const response = await request(app).get('/api/chatrooms');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].roomId).toEqual(1);
    expect(response.body[0].roomname).toEqual('Lobby');
    done();
  });

  test('It should handle POST requests to chatrooms table', async done => {
    let response = await request(app)
      .post('/api/chatrooms')
      .send({ roomname: 'testroom' });
    expect(response.statusCode).toEqual(201);
    response = await request(app).get('/api/chatrooms');
    expect(response.statusCode).toEqual(200);
    expect(response.body[1].roomId).toEqual(2);
    expect(response.body[1].roomname).toEqual('testroom');
    done();
  });

  test('It should handle GET  requests to messages table with userID', async done => {
    const response = await request(app).get('/api/messages?userId=1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].username).toEqual('OG User');
    expect(response.body[0].roomname).toEqual('Lobby');
    expect(response.body[0].message).toEqual('First message!');
    done();
  });

  test('It should handle GET  requests to messages table with roomID', async done => {
    const response = await request(app).get('/api/messages?roomId=1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[0].username).toEqual('OG User');
    expect(response.body[0].message).toEqual('First message!');
    done();
  });

  test('It should handle POST requests to messages table', async done => {
    let response = await request(app)
      .post('/api/messages')
      .send({
        message: 'test message',
        userId: 1,
        roomId: 1
      });
    expect(response.statusCode).toEqual(201);
    response = await request(app).get('/api/messages?roomId=1');
    expect(response.statusCode).toEqual(200);
    expect(response.body[1].message).toEqual('test message');
    expect(response.body[1].username).toEqual('OG User');
    done();
  });
});
