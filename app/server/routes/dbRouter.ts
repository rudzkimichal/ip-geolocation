import express from 'express';
import { collection } from '../db/client';

export const dbRouter = express.Router();

dbRouter.get(`/items`, async (req: express.Request, resp: express.Response) => {
  try {
    const items = await collection.find({}).toArray();
    resp.status(200).send(items);
  } catch(error) {
    if(error instanceof Error) resp.status(500).send(error.message);
  }
});
