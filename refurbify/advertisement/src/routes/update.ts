import express, { Request, response, Response } from 'express';
import { body } from 'express-validator';
import { mquery } from 'mongoose';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import { NotFoundError } from '../errors/not-found-error';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Advertisement } from '../models/advertisement';

const router = express.Router();

router.put(
  '/api/advertisements/:id',
  requireAuth,
  [
    body('category')
      .trim()
      .not()
      .isEmpty()
      .withMessage('La categoria è richiesta'),
    body('title').trim().not().isEmpty().withMessage('il Titolo è richiesto'),
    body('description')
      .trim()
      .not()
      .isEmpty()
      .withMessage('La descrizione è richiesta'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Il prezzo deve essere maggiore di 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const advertisement = await Advertisement.findById(req.params.id);

    if (!advertisement) {
      res.status(404).send({});
      return;
    }

    if (advertisement.userId !== req.currentUser!.id) {
      res.status(401).send({});
      return;
    }

    advertisement.set({
      title: req.body.title,
      price: req.body.price,
      category: req.body.category,
      description: req.body.description,
    });
    await advertisement.save();

    res.send(advertisement);
  }
);

export { router as UpdateAdRouter };
