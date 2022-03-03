import dotenv from 'dotenv';
import { MongoClient, Collection } from 'mongodb';
import Item from './model';
import validateWithSchema from './schema';

export let collection: Collection<Item>;

export const connectDatabase = async () => {
  dotenv.config();

  const client = new MongoClient(`${process.env.DB_URI}`);
  await client.connect();
  const db = client.db('geolocation');
  await validateWithSchema(db);
  const itemsCollection = db.collection<Item>('data');
  collection = itemsCollection;
  console.log(`Database '${db.databaseName}' connected.`);
};
