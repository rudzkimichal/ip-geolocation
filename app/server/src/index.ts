import express from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './db/client';
import { apiRouter } from './routes/apiRouter';
import { dbRouter } from './routes/dbRouter';
import { authRouter } from './routes/authRouter';

dotenv.config();
const app = express();
const port = 8080;

connectDatabase();
app.use(express.json());
app.use('/api', apiRouter);
app.use('/db', [dbRouter, authRouter]);

app.listen(port, () => console.log(`App listening on port ${port}`));
