import { ObjectId } from 'mongodb';

export default interface Item {
  id?: ObjectId;
  ipOrUrl: string;
  city: string;
  region?: string;
  country: string;
  flag?: string;
  latitude: number;
  longitude: number;
}
