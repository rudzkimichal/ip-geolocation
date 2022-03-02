import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

export const client = new MongoClient(
  `mongodb+srv://admin:${process.env.DB_PASSWORD}@geolocation.f3uwb.mongodb.net/geolocation?retryWrites=true&w=majority`
);
