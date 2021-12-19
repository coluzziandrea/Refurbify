import request from 'supertest';
import { app } from '../../app';

const apiUrl = '/api/advertisements';

it('has a route handler listening to /api/advertisements for get request', async () => {
  const resp = await request(app).get(apiUrl);

  expect(resp.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).get(apiUrl).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .get(apiUrl)
    .set('Cookie', global.signin());

  expect(response.status).not.toEqual(401);
});

prepareDatabase() {

    for
    await createAdvertisement()
}

it('returns all the advertisements if no parameter is passed', async () => {

});
