import express, { Request, response, Response } from 'express';
import { mquery } from 'mongoose';
import { requireAuth } from '../middlewares/require-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Advertisement } from '../models/advertisement';

const router = express.Router();

router.get(
  '/api/advertisements/search',
  requireAuth,
  async (req: Request, res: Response) => {
    const { userId, userCity, title, category } = req.query;

    let myQuery = Advertisement.find();

    if (userId) {
      myQuery = myQuery.where('userId').equals(userId);
    }

    if (userCity) {
      myQuery = myQuery.where('userCity').equals(userCity);
    }

    if (title) {
      myQuery = myQuery.where('title').regex('.*' + title + '.*');
    }

    if (category) {
      myQuery = myQuery.where('category').equals(category);
    }

    // sort by date
    myQuery = myQuery.sort('createdAt desc');

    const ads = await myQuery;
    res.status(200).send(ads);
  }
);

export { router as SearchAdsRouter };
