import { Router, Request, Response } from 'express';
import { getDb } from '../db/client';
import { User } from '../db/models';

export const authRouter = Router();
