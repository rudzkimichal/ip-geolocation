import axios from 'axios';
import express from 'express';

export const apiRouter = express.Router();

apiRouter.get(`/api/:item`, async (req: express.Request, resp: express.Response) => {
    const response = await axios.get(`http://api.ipstack.com/${req.params.item}?access_key=${process.env.API_KEY}`);
    resp.send(response.data);
});
