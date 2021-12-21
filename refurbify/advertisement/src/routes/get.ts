import express, { Request, response, Response } from 'express';
import { NotFoundError } from '../errors/not-found-error';
import { requireAuth } from '../middlewares/require-auth';
import { Advertisement } from '../models/advertisement';
import mongoose from 'mongoose';

const router = express.Router();

router.get(
  '/api/advertisements/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const ad = await Advertisement.findById(req.params.id);

    if (!ad) {
      res.status(404).send({});
      return;
    }

    res.send({ data: ad });
  }
);

export { router as GetAdRouter };
