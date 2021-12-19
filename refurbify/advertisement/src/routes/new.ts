import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Advertisement } from '../models/advertisement';

const router = express.Router();

router.post(
  '/api/advertisements',
  requireAuth,
  [
    body('userId').trim().not().isEmpty().withMessage("L'utente è richiesto"),
    body('userEmail')
      .trim()
      .isEmail()
      .withMessage("L'Email utente è richiesta"),
    body('userCity')
      .trim()
      .not()
      .isEmpty()
      .withMessage("La città dell'utente è richiesta"),
    body('userName')
      .trim()
      .not()
      .isEmpty()
      .withMessage("Il nome dell'utente è richiesto"),
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
    body('createdAt')
      .isInt({ gt: 0 })
      .withMessage('La data di creazione deve essere valida'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {
      userId,
      userEmail,
      userCity,
      userName,
      category,
      title,
      description,
      price,
      createdAt,
      imageUrl,
    } = req.body;

    const ad = Advertisement.build({
      userId,
      userEmail,
      userCity,
      userName,
      category,
      title,
      description,
      price,
      createdAt,
      imageUrl,
    });

    await ad.save();
    res.status(201).send(ad);
  }
);

export { router as CreateAdRouter };
