import { ResponseData } from '../model/response-data.model';
import { User } from '../model/user/user.model';

export const SUCCESSFUL_SIGNUP_MOCK: ResponseData<User> = {
  data: {
    email: 'test@test.com',
    name: 'Mario',
    birthDate: 1234567,
    gender: 'maschio',
    city: 'Rome',
    id: '61bda376852d2ff8f7a9cd61',
  },
};

export const ERROR_SIGNUP_MOCK: any = {
  errors: [
    {
      message: 'Email in use',
    },
  ],
};
