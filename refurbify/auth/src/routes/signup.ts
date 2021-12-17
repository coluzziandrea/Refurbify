import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';

import { User } from '../models/user';
import { Logger } from '../services/logger';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    Logger.debug('Signup called');
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    Logger.debug('checking existing user...');

    if (existingUser) {
      Logger.error('it does exist a user with same email!');
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });

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
    res.status(201).send(user);
  }
);

export { router as signupRouter };
