import { Advertisement } from '../model/advertisement/advertisement.model';
import { ResponseData } from '../model/response-data.model';

export const SUCCESSFULL_GET_ADVERTISEMENT_MOCK: ResponseData<Advertisement> = {
  data: {
    id: '111111',
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
};

export const ERROR_GET_ADVERTISEMENT_MOCK: ResponseData<Advertisement> = {
  errors: [
    {
      message: 'Error',
    },
  ],
};
