import request from 'supertest';
import { app } from '../../app';
import { Advertisement, AdvertisementAttrs } from '../../models/advertisement';
import { ADVERTISEMENTS_INPUT_MOCK } from '../../__mocks__/advertisements';
import mongoose from 'mongoose';

const apiUrl = '/api/advertisements';

const createAdvertisement = (adv: AdvertisementAttrs) => {
  return request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send(adv);
};

const prepareDatabase = async () => {
  for (let adv of ADVERTISEMENTS_INPUT_MOCK) {
    await createAdvertisement(adv);
  }
};

it('should delete advertisement with ID', async () => {
  await prepareDatabase();

  const collections = await Advertisement.find();

  const length = collections.length;

  const id = collections[0].id;

  console.log('Deleting id: ' + id);

  await request(app)
    .delete(apiUrl + '/' + id)
    .set('Cookie', global.signin())
    .send()
    .expect(200);

  const collections2 = await Advertisement.find();

  const length2 = collections2.length;

  expect(length2).toBeLessThan(length);
});
