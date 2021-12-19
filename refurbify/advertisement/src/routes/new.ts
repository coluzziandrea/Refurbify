import express, { Request, Response } from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';

const router = express.Router();

router.post(
  '/api/advertisements',
  requireAuth,
  [],
  validateRequest,
  async (req: Request, res: Response) => {
    res.status(500).send({});
  }
);

export { router as CreateAdRouter };
