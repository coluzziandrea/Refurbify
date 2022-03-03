import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

jest.setTimeout(30000);

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'test123';

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const name = 'Mario';
  const birthDate = new Date().getTime();
  const gender = 'maschio';
  const city = 'Rome';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password, name, birthDate, gender, city })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie;
};
