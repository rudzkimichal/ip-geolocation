import axios from 'axios';
import express, { Request, Response } from 'express';

export const apiRouter = express.Router();

apiRouter.get(`/api/:item`, async (req: Request, resp: Response) => {
  try {
    const item = req?.params?.item;
    const response = await axios.get(`http://api.ipstack.com/${item}?access_key=${process.env.API_KEY}`);
    resp.status(200).send(response.data);

  } catch(e) {
    resp.status(404).send('Unable to find item matching query');
  }
});
