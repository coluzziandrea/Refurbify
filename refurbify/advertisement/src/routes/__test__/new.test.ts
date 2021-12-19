import request from 'supertest';
import { app } from '../../app';
import { Advertisement } from '../../models/advertisement';

it('Has a route handler listening to /api/advertisements for post requests', async () => {
  const response = await request(app).post('/api/advertisements').send({});

  expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  const response = await request(app).post('/api/advertisements').send({});

  expect(response.status).toEqual(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid user ID is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid user email is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: '',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid user city is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: '',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid user name is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: '',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid category is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: '',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid title is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: '',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid description is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: '',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      price: 105,
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid price is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: -2,
      createdAt: 123456789,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      createdAt: 123456789,
    })
    .expect(400);
});

it('returns an error if an invalid created date is provided', async () => {
  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: -1,
    })
    .expect(400);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
    })
    .expect(400);
});

it('creates an advertisement with valid inputs', async () => {
  let ads = await Advertisement.find({});
  expect(ads.length).toEqual(0);

  await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send({
      userId: '12345',
      userEmail: 'test@test.com',
      userCity: 'Roma',
      userName: 'Mario Rossi',
      category: 'informatica',
      title: 'Lampadario',
      description: 'Lampadario vecchio come nuovo',
      price: 105,
      createdAt: 123456789,
    })
    .expect(201);

  ads = await Advertisement.find({});
  expect(ads.length).toEqual(1);

  expect(ads[0].userId).toEqual('12345');
  expect(ads[0].userEmail).toEqual('test@test.com');
  expect(ads[0].userCity).toEqual('Roma');
  expect(ads[0].userName).toEqual('Mario Rossi');
  expect(ads[0].category).toEqual('informatica');
  expect(ads[0].title).toEqual('Lampadario');
  expect(ads[0].description).toEqual('Lampadario vecchio come nuovo');
  expect(ads[0].price).toEqual(105);
  expect(ads[0].createdAt).toEqual(123456789);
});
