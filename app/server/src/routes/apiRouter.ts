import axios from 'axios';
import express, { Request, Response } from 'express';

export const apiRouter = express.Router();

apiRouter.get(`/:item`, async (req: Request, resp: Response) => {
  try {
    const item = req?.params?.item;
    const response = await axios.get(
      `http://api.ipstack.com/${item}`,
      {
        params: {
          access_key: process.env.API_KEY
        }
      }
    );
    resp.status(200).send(response.data);
  } catch(error) {
    if(error instanceof Error) resp.status(404).send('Unable to find item matching query');
  }
});
