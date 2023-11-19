import express, { NextFunction, Request, response, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { requireAuth } from '../middlewares/require-auth';
import { Advertisement } from '../models/advertisement';
import mongoose from 'mongoose';

const router = express.Router();

router.delete(
  '/api/advertisements/:id',
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('not a valid ID, calling next function');
      next();
    }

    await Advertisement.remove({
      _id: req.params.id,
    });

    res.status(200).send({});
  }
);

export { router as DeleteAdRouter };
