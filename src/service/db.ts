import { MongoClient } from 'mongodb';



const dbService = {
  todo: null as unknown as any,
  user: null as unknown as any
};

export async function connectToDb () {
  // Connection URL
  // mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE
  const url = 'mongodb://root:testpassword@localhost:27017';
  const client = new MongoClient(url);
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db('todo');

  const todo = db.collection('todo-list');
  dbService.todo = todo as unknown as any || null;

  const user = db.collection('user-list');
  dbService.user = user as unknown as any || null;
}

export default dbService;
