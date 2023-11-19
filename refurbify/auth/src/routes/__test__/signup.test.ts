import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  jest.setTimeout(30000);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(201);
});

it('returns a 400 with missing or invalid email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'alskdflaskjfd',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);
});

it('returns a 400 with missing or invalid password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'p',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);
});

it('returns a 400 with missing or invalid name', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: '',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);
});

it('returns a 400 with missing or invalid birtDate', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: null,
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);
});

it('returns a 400 with missing or invalid gender', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: '',
      city: 'Rome',
    })
    .expect(400);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'notValid',
      city: 'Rome',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      city: 'Rome',
    })
    .expect(400);
});

it('returns a 400 with missing or invalid city', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: '',
    })
    .expect(400);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
    })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(400);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      name: 'Mario',
      birthDate: new Date().getTime(),
      gender: 'maschio',
      city: 'Rome',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
