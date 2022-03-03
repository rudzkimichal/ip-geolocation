import { ObjectId } from 'mongodb';

export default interface Item {
  latitude: number;
  longitude: number;
  id?: ObjectId;
}
