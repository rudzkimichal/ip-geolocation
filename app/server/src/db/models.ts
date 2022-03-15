import { ObjectId } from 'mongodb';

interface Item {
  id?: ObjectId;
  ipOrUrl: string;
  city: string;
  region?: string;
  country: string;
  flag?: string;
  latitude: number;
  longitude: number;
}

interface User {
  id?: ObjectId;
  name?: string;
  email: string;
  password: string;
}

export { Item, User };
