import express from 'express';
import { client } from '../db/client';

export const dbRouter = express.Router();

client.connect((err: any) => {
  if(err) throw new Error(err);

  const collection = client.db('geolocation').collection('data');
  dbRouter.get(`/items`, async (req: express.Request, resp: express.Response) => {
      const items = await collection.find({}).toArray();
      resp.send(items.length !== 0 ? items : 'Database is empty');
  });

  dbRouter.post(`/items`, async (req: express.Request, resp: express.Response) => {
       // POST items to database
  });

  dbRouter.put(`/items/:id`, async (req: express.Request, resp: express.Response) => {
       // update item in database
  });

  dbRouter.delete(`/items/:id`, async (req: express.Request, resp: express.Response) => {
       // DELETE item from database
  });
});
