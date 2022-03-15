import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/client';

export const dbRouter = Router();

dbRouter.get(`/items`, async (req: Request, resp: Response) => {
  try {
    const db = await getDb();
    const response = await db.collection('data').find({}).toArray();
    const items = await response;
    resp.status(200).json(items);
  } catch(error) {
    if(error instanceof Error) resp.status(500).send(error.message);
  }
});

dbRouter.post('/items', async (req: Request, resp: Response) => {
  try {
    const db = await getDb();
    const item = req.body;
    if(await db.collection('data').find({ipOrUrl: req.body.ipOrUrl})) return resp.status(303).send('Data for given IP or url already in the database.');
    const payload = await db.collection('data').insertOne(item);
    payload ? resp.status(201).json(payload) : resp.status(500).send('Item not added to database');
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});

dbRouter.put('/items/:id', async (req: Request, resp: Response) => {
  try {
    const db = await getDb();
    const id = req?.params?.id;
    const updatedItem = req.body;
    const payload = await db.collection('data').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedItem}
    );
    payload ? resp.status(200).json(payload) : resp.status(400).send(`Couldn't update item with id ${id}`);
  } catch(error) {
    if(error instanceof Error) resp.status(400).send(error.message);
  }
});

dbRouter.delete('/items/:id', async (req: Request, resp: Response) => {
  try {
    const db = await getDb();
    const id = req?.params?.id;
    const itemRemoval = await db.collection('data').deleteOne({ _id: new ObjectId(id) });
    if(itemRemoval && itemRemoval.deletedCount) {
      resp.status(202).json(itemRemoval);
    } else if(!itemRemoval) {
      resp.status(400).send(`Failed to delete item with id ${id}.`);
    } else if(!itemRemoval.deletedCount) {
      resp.status(404).send(`Item with id ${id} doesn't exist.`);
    }
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});

// Clear database

dbRouter.delete('/items', async (req: Request, resp: Response) => {
  try {
    const db = await getDb();
    const dbReset = await db.collection('data').deleteMany({ });
    if(dbReset && dbReset.deletedCount) {
      resp.status(202).json(dbReset);
    } else if(!dbReset) {
      resp.status(400).send(`Failed to clear database.`);
    } else if(!dbReset.deletedCount) {
      resp.status(404).send(`Database has already been empty.`);
    }
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});
