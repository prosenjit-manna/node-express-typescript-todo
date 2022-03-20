import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import todoRoutes from './todo/routes';
import userRoutes from './user/routes';
import { connectToDb } from './service/db';

connectToDb();

// get config vars
dotenv.config();

// Boot express
const app: Application = express();
const port = 5002;

// This is for parse request body as JSON
app.use(express.json());

// Application routing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Application started!');
});

app.use('/todo', todoRoutes);
app.use('/user', userRoutes);


// Start server
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
