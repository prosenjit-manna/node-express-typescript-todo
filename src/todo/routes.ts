import express, { Request, Response, NextFunction } from 'express';

import todoService from '../service/todo.service';

const router = express.Router();

// Todo Module Routes

// Get Todo List
router.get('/list', (req: Request, res: Response, next: NextFunction) => {
  todoService
    .getList()
    .then((todoList: any) => {
      res.status(200).send(todoList);
    })
    .catch((err: any) => {
      res.status(500).send(err);
    });
});

// Get Todo
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  todoService
    .findOne(req.params.id)
    .then((todo) => {
      if (todo) {
        res.status(200).send(todo);
      } else {
        res.status(200).send({ error: 'Todo not found' });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Create Todo
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  todoService
    .create(req.body)
    .then((todo) => {
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Update Todo
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  todoService
    .update(req.body, req.params.id)
    .then((todo) => {
      console.log(todo);
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

// Delete Todo
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  todoService
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
