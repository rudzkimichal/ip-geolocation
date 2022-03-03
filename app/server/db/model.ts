import { ObjectId } from 'mongodb';

export default interface Item {
  id?: ObjectId;
  name: string;
  city: string;
  region: string;
  country: string;
  flag: URL;
  latitude: number;
  longitude: number;
}
