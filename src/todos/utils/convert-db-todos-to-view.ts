import { ApiProperty } from '@nestjs/swagger';

export type TodoMongoDbType = {
  _id: string;
  title: string;
  completed: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type TodoOutputType = {
  id: string;
  title: string;
  completed: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export const convertDbTodosToView = (todo: TodoMongoDbType): TodoOutputType => {
  return {
    id: todo._id,
    title: todo.title,
    completed: todo.completed,
    order: todo.order,
    createdAt: todo.createdAt,
    updatedAt: todo.updatedAt,
  };
};
