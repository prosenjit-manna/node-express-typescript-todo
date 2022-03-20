import { User } from 'model/user.interface';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import dbService from './db';

const saltRounds = 10;

dotenv.config();

function generateAccessToken(username: string) {
  return jwt.sign({ username, time: new Date().toISOString() }, process.env.TOKEN_SECRET as string);
}

const userService = {
  getList: () => {
    return dbService.user.find().toArray();
  },
  create: async (data: User) => {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(data.password, salt);
    data.password = hash;

    return dbService.user.insertOne(data);
  },
  signIn: async (data: User) => {
    const query = {
      email: data.email,
    };
    const user = await dbService.user.findOne(query);

    const result = await bcrypt.compare(data.password, user.password);
    const token = generateAccessToken(user.email);

    user.token = token;
    // this access token can set to db 
    // and prev token would not work anymore
    await dbService.user.updateOne({ _id: new ObjectId(user._id) }, { $set: user });

    return { token: token, success: result };
  },
  update: async (data: any, id: string) => {
    return dbService.user.updateOne({ _id: new ObjectId(id) }, { $set: data });
  },
  delete: async (id: string) => {
    return dbService.user.remove({ _id: new ObjectId(id) });
  },
  findOne: async (id: string) => {
    const query = {
      _id: new ObjectId(id),
    };
    return dbService.user.findOne(query);
  },
  findByQuery: async (query: any) => {
    return dbService.user.findOne(query);
  },
};

export default userService;
