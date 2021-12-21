import request from 'supertest';
import { app } from '../../app';
import { AdvertisementAttrs } from '../../models/advertisement';
import { ADVERTISEMENTS_INPUT_MOCK } from '../../__mocks__/advertisements';
import mongoose from 'mongoose';

const apiUrl = '/api/advertisements';

it('returns a 404 if the provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/advertisements/${id}`)
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
    .expect(404);
});

it('updates the ad provided valid inputs', async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post('/api/advertisements')
    .set('Cookie', cookie)
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
    });

  await request(app)
    .put(`/api/advertisements/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'new title',
    })
    .expect(200);

  const adResponse = await request(app)
    .get(`/api/advertisements/${response.body.id}`)
    .send();

  expect(adResponse.body.title).toEqual('new title');
});
