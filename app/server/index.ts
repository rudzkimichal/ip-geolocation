import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './db/client';
import { apiRouter } from './routes/apiRouter';
import { dbRouter } from './routes/dbRouter';

dotenv.config();
const app = express();
const port = 8080;

connectDatabase();
app.use(apiRouter);
app.use(dbRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
