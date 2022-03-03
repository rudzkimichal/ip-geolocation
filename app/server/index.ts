import express from 'express';
import dotenv from 'dotenv';
import { BodyParser } from 'body-parser';
import { connectDatabase } from './db/client';
import { apiRouter } from './routes/apiRouter';
import { dbRouter } from './routes/dbRouter';

dotenv.config();
const app = express();
const port = 8080;

connectDatabase();
app.use(express.json());
app.use('/api', apiRouter);
app.use('/db', dbRouter);

app.listen(port, () => console.log(`App listening on port ${port}`));
