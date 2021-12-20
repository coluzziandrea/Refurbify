import { AdvertisementAttrs } from '../../models/advertisement';
import request from 'supertest';
import { app } from '../../app';
import { ADVERTISEMENTS_INPUT_MOCK } from '../../__mocks__/advertisements';

const apiUrl = '/api/advertisements';

it('has a route handler listening to /api/advertisements/:id search for get request', async () => {
  const resp = await request(app)
    .get(apiUrl + '/12345')
    .send();

  expect(resp.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app)
    .get(apiUrl + '/12345')
    .send()
    .expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .get(apiUrl + '/12345')
    .set('Cookie', global.signin())
    .send();

  expect(response.status).not.toEqual(401);
});

it('returns the right advertisement when searching by ID', async () => {
  const resp = await request(app)
    .post('/api/advertisements')
    .set('Cookie', global.signin())
    .send(ADVERTISEMENTS_INPUT_MOCK[0]);

  const id = resp.body['id'];

  const response = await request(app)
    .get(apiUrl + '/' + id)
    .set('Cookie', global.signin())
    .send();

  const ad = response.body;
  expect(ad).toBeTruthy();
});
