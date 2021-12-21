import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { ADVERTISEMENTS_INPUT_MOCK } from '../../__mocks__/advertisements';
import { AdvertisementAttrs } from '../../models/advertisement';

it('returns a 404 if the ticket is not found', async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  const query = `/api/advertisements/${id}`;

  await request(app)
    .get(query)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});
