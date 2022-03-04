import { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collection } from '../db/client';

export const dbRouter = Router();

dbRouter.get(`/items`, async (req: Request, resp: Response) => {
  try {
    const items = await collection.find({ }).toArray();
    resp.status(200).send(items);
  } catch(error) {
    if(error instanceof Error) resp.status(500).send(error.message);
  }
});

dbRouter.post('/items', async (req: Request, resp: Response) => {
  try {
    const item = req.body;
    const payload = await collection.insertOne(item);
    payload ? resp.status(201).send('Item successfully added to database') : resp.status(500).send('Item not added to database');
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});

dbRouter.put('/items/:id', async (req: Request, resp: Response) => {
  try {
    const id = req?.params?.id;
    const updatedItem = req.body;
    const payload = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedItem}
    );
    payload ? resp.status(200).send(`Successfully updated item with id ${id}`) : resp.status(400).send(`Couldn't update item with id ${id}`);
  } catch(error) {
    if(error instanceof Error) resp.status(400).send(error.message);
  }
});

dbRouter.delete('/items/:id', async (req: Request, resp: Response) => {
  try {
    const id = req?.params?.id;
    const itemRemoval = await collection.deleteOne({ _id: new ObjectId(id) });
    itemRemoval ? resp.status(202).send(`Successfully deleted item with id ${id}`) : resp.status(400).send(`Couldn't delete item with id ${id}`);
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});

// Clear database

dbRouter.delete('/items', async (req: Request, resp: Response) => {
  try {
    const dbReset = await collection.deleteMany({ });
    dbReset ? resp.status(202).send(`Database successfully cleared.`) : resp.status(400).send(`Couldn't clear database`);
  } catch(error) {
    if(error instanceof Error) resp.status(404).send(error.message);
  }
});
