import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

import { User } from '../models/user';
import { UserGender } from '../models/user-gender';
import { Logger } from '../services/logger';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage("L'email deve essere valida"),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('La Password deve essere compresa tra i 4 e i 20 caratteri'),
    body('name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('il Nome deve essere una stringa non vuota'),
    body('birthDate')
      .isNumeric()
      .withMessage('La data di nascita deve essere valida'),
    body('gender')
      .isIn(UserGender.valuesArr)
      .withMessage("Il Genere deve essere uno fra 'Maschio' o 'Femmina'"),
    body('city')
      .trim()
      .isLength({ min: 1 })
      .withMessage('La Città deve essere una stringa non vuota'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    Logger.debug('Signup called');
    const { email, password, name, birthDate, gender, city } = req.body;

    const existingUser = await User.findOne({ email });

    Logger.debug('checking existing user...');

    if (existingUser) {
      Logger.error('it does exist a user with same email!');
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password, name, birthDate, gender, city });

    Logger.debug('calling user save...');
    await user.save();

    Logger.debug('generating JWT...');

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );
    Logger.debug('Storing session object...');

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    Logger.info('Responding OK to User Signup.');
    res.status(201).send({ data: user });
  }
);

export { router as signupRouter };
