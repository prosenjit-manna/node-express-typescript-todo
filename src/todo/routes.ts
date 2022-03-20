import express, { Request, Response, NextFunction } from 'express';

const router = express.Router();


// Todo Module Routes

// Get Todo List
router.get('/list', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send([
    {
      id: 1,
      title: 'Todo 1',
      completed: false
    }
  ]);
});

// Get Todo
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    id: req.params.id
  });
});

// Create Todo
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(req.body);
});

// Update Todo
router.put('/:id', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send(req.body);
});

export default router;
