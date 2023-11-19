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

  {
    userId: '123456',
    userEmail: 'mario.rossi@gmail.com',
    userCity: 'Roma',
    userName: 'Mario Rossi',
    category: 'fai da te',
    title: 'Motosega',
    description: 'Splendida motosega ancora perfettamente funzionante',
    price: 189,
    createdAt: 123456783333,
  },

  {
    userId: '12345',
    userEmail: 'averdi@gmail.com',
    userCity: 'Milano',
    userName: 'Alessandro Verdi',
    category: 'abbigliamento',
    title: 'Giacca Nera',
    description: 'Giacca nera indossata in poche occasioni',
    price: 500,
    createdAt: 12345783333,
  },
];
