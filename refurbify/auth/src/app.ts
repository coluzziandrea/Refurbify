import express from 'express';
import { json } from 'body-parser';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import cors from 'cors';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// setting cors for local run
const corsOrigin = process.env.CORS_ORIGIN;
console.log('cors: ' + corsOrigin);
if (corsOrigin && corsOrigin?.length > 0) {
  console.log('setting cors');

  var corsOptions = {
    origin: corsOrigin,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
}

app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
