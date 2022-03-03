import { Router, Request, Response } from 'express';
import { collection } from '../db/client';

export const dbRouter = Router();

dbRouter.get(`/items`, async (req: Request, resp: Response) => {
  try {
    const items = await collection.find({}).toArray();
    resp.status(200).send(items);
  } catch(error) {
    if(error instanceof Error) resp.status(500).send(error.message);
  }
});

dbRouter.post('/items', async (req: Request, resp: Response) => {
  try {
    const item = req.body;
    const payload = await collection.insertOne(item);
    payload ? resp.status(201).send('Item successfully added to database') : resp.status(500).send('Item not added to database')
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});
