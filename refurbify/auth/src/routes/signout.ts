import express from 'express';
import { Logger } from '../services/logger';

const router = express.Router();

router.post('/api/users/signout', (req, res) => {
  Logger.debug('signout called');

  req.session = null;

  res.send({});
});

export { router as signoutRouter };
