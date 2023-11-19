import { Advertisement } from '../model/advertisement/advertisement.model';
import { ResponseData } from '../model/response-data.model';
import { User } from '../model/user/user.model';

export const SUCCESSFUL_CREATE_AD_MOCK: ResponseData<Advertisement> = {
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

export const ERROR_CREATE_AD_MOCK: any = {
  errors: [
    {
      message: 'Error',
    },
  ],
};
