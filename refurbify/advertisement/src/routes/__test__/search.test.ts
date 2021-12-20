import request from 'supertest';
import { app } from '../../app';
import { AdvertisementAttrs } from '../../models/advertisement';
import { ADVERTISEMENTS_INPUT_MOCK } from '../../__mocks__/advertisements';

const apiUrl = '/api/advertisements/search';

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

it('has a route handler listening to /api/advertisements/search for get request', async () => {
  const resp = await request(app).get(apiUrl).send();

  expect(resp.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
  await request(app).get(apiUrl).send().expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .get(apiUrl)
    .set('Cookie', global.signin())
    .send();

  expect(response.status).not.toEqual(401);
});

it('returns all the advertisements if no parameter is passed', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .set('Cookie', global.signin())
    .send();

  expect(response.body.length).toEqual(ADVERTISEMENTS_INPUT_MOCK.length);
});

it('returns date-ordered advertisements, starting from the latest', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  let lastDate = 0;
  for (let ad of ads) {
    expect(lastDate).toBeLessThanOrEqual(ad.createdAt);
    lastDate = ad.createdAt;
  }
});

it('returns the right advertisement(s) when searching by user', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .query({
      userId: '12345',
    })
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  expect(ads.length).toBeGreaterThan(0);

  for (let ad of ads) {
    expect(ad.userId).toEqual('12345');
  }
});

it('returns the right advertisement(s) when searching by city', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .query({
      userCity: 'Roma',
    })
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  expect(ads.length).toBeGreaterThan(0);

  for (let ad of ads) {
    expect(ad.userCity).toEqual('Roma');
  }
});

it('returns the right advertisement(s) when searching by title', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .query({
      title: 'Lampadario',
    })
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  expect(ads.length).toBeGreaterThan(0);

  for (let ad of ads) {
    expect(ad.title.includes('Lampadario')).toBeTruthy();
  }
});

it('returns the right advertisement(s) when searching by category', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .query({
      category: 'Informatica',
    })
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  expect(ads.length).toBeGreaterThan(0);

  for (let ad of ads) {
    expect(ad.category.toLowerCase()).toEqual('informatica');
  }
});

it('returns the right advertisement(s) when searching by one field and the other fields blank', async () => {
  await prepareDatabase();

  const response = await request(app)
    .get(apiUrl)
    .query({
      category: '',
      city: '',
      userId: '',
      title: 'Lampadario',
    })
    .set('Cookie', global.signin())
    .send();

  const ads = response.body;

  expect(ads.length).toBeGreaterThan(0);

  for (let ad of ads) {
    expect(ad.title.includes('Lampadario')).toBeTruthy();
  }
});
