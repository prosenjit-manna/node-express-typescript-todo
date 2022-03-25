import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const todoService = {
  getList: () => {
    return prisma.todo.findMany();
  },
  create: async (data: any) => {
    return prisma.todo.create(data);
  },
  update: async (data: any, id: string) => {
    return prisma.todo.update(data);
  },
  delete: async (id: string) => {
    return prisma.todo.delete({
      where: {
        id
      }
    })
  },
  findOne: async (id: string) => {
    const query = {
      _id: new ObjectId(id),
    };
    return dbService.todo.findOne(query);
  },
};

export default todoService;
