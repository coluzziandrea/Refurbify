import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  email: string;
}

// Extend Express's Request object to include currentUser property
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Current user mdw');
  if (!req.session?.jwt) {
    console.log('not found JWT!');
    return next();
  }

  console.log('extracting JWT...');
  try {
    const payload = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;

    console.log('found user with ID: ' + payload.id);
    req.currentUser = payload;
  } catch (err) {}

  next();
};
