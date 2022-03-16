import dotenv from 'dotenv';
import { MongoClient, Collection, Db } from 'mongodb';

let _db: Db;
export const getDb = () => _db;

export const connectDatabase = async () => {
  try {
    dotenv.config();

    const client = new MongoClient(`${process.env.DB_URI}`);
    await client.connect();
    const db = client.db('geolocation');
    _db = db;
    console.log(`Database '${db.databaseName}' connected.`);
  } catch(error) {
    if(error instanceof Error) console.error(`Database connection failed - ${error.message}`);
  }
};
