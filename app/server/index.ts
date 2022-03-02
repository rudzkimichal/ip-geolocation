import express from 'express';
import dotenv from 'dotenv';
import { apiRouter } from './routes/apiRouter';
import { dbRouter } from './routes/dbRouter';

dotenv.config();
const app = express();
const port = 8080;
app.use(apiRouter);
app.use(dbRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
