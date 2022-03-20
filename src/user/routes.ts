import express, { Request, Response, NextFunction } from 'express';
import { User } from 'model/user.interface';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import userService from '../service/user.service';

const router = express.Router();
dotenv.config();

export async function authenticateToken(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  const parsedToken = await jwt.verify(token, process.env.TOKEN_SECRET as string) as any;
  // console.log({ parsedToken });

  const u = await userService.findByQuery({ email: parsedToken.username });

  // console.log({ u, token });

  if (u == null || u.token !== token) return res.sendStatus(401);

  next();
}

// User Module Routes

// Get User List
router.get('/list', authenticateToken, (req: Request, res: Response, next: NextFunction) => {
  userService
    .getList()
    .then((userList: User[]) => {
      res.status(200).send(userList);
    })
    .catch((err: any) => {
      res.status(500).send(err);
    });
});

// Get User
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  userService
    .findOne(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(200).send({ error: 'User not found' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create User
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  userService
    .create(req.body)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Login
router.post('/sign-in', (req: Request, res: Response, next: NextFunction) => {
  userService
    .signIn(req.body)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(200).send({ error: 'Unable to login' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

// Update User
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  userService
    .update(req.body, req.params.id)
    .then((todo) => {
      console.log(todo);
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete User
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  userService
    .delete(req.params.id)
    .then((todo) => {
      console.log(todo);
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;
