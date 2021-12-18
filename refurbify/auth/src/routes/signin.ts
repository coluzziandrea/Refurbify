import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Logger } from '../services/logger';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    Logger.debug('Signin called');
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      Logger.error('not found user with credential!');
      throw new BadRequestError('Invalid credentials');
    }

    Logger.debug('checking password...');
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      Logger.error('password do not match!');
      throw new BadRequestError('Invalid Credentials');
    }

    Logger.debug('generating JWT...');
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    Logger.debug('storing to session object...');
    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    Logger.debug('sending back user...');
    res.status(200).send({ data: existingUser });
  }
);

export { router as signinRouter };
