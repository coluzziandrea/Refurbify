import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
import { CreateAdRouter } from './routes/new';
import { currentUser } from './middlewares/current-user';
import { SearchAdsRouter } from './routes/search';

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

app.use(currentUser);
app.use(CreateAdRouter);
app.use(SearchAdsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
