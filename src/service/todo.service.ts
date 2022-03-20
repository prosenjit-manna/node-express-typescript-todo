import { ObjectId } from 'mongodb';
import dbService from './db';

const todoService = {
  getList: () => {
    return dbService.todo.find().toArray();
  },
  create: async (data: any) => {
    return dbService.todo.insertOne(data);
  },
  update: async (data: any, id: string) => {
    return dbService.todo.updateOne({ _id: new ObjectId(id) }, { $set: data });
  },
  delete: async (id: string) => {
    return dbService.todo.remove({ _id: new ObjectId(id) });
  },
  findOne: async (id: string) => {
    const query = {
      _id: new ObjectId(id),
    };
    return dbService.todo.findOne(query);
  },
};

export default todoService;
