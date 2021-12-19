import { Advertisement } from '../advertisement';

it('save the advertisement and generate new ID', async () => {
  const advertisement = Advertisement.build({
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

  await advertisement.save();

  expect(advertisement.id).toBeTruthy();
});
