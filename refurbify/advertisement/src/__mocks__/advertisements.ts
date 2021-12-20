import { AdvertisementAttrs } from '../models/advertisement';

export const ADVERTISEMENTS_INPUT_MOCK: AdvertisementAttrs[] = [
  {
    userId: '123456',
    userEmail: 'mario.rossi@gmail.com',
    userCity: 'Roma',
    userName: 'Mario Rossi',
    category: 'Arredamento',
    title: 'Lampadario',
    description: 'Lampadario vecchio come nuovo',
    price: 350.01,
    createdAt: 12345678999,
  },
  {
    userId: '98765',
    userEmail: 'roberto.bianchi@gmail.com',
    userCity: 'Torino',
    userName: 'Roberto Bianchi',
    category: 'Informatica',
    title: 'Telefono',
    description: 'Telefono usato solo una volta',
    price: 145,
    createdAt: 123456789993,
  },
  {
    userId: '98765',
    userEmail: 'roberto.bianchi@gmail.com',
    userCity: 'Torino',
    userName: 'Roberto Bianchi',
    category: 'Informatica',
    title: 'Telefono',
    description: 'Telefono usato solo una volta',
    price: 145,
    createdAt: 123456789993,
  },
];
