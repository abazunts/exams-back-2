import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, now, ObjectId } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import {
  convertDbTodosToView,
  TodoMongoDbType,
  TodoOutputType,
} from './utils/convert-db-todos-to-view';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findAll(): Promise<TodoOutputType[]> {
    const todos = await this.todoModel.find().lean().exec();
    return todos.map(convertDbTodosToView);
  }

  async findOne(id: ObjectId): Promise<TodoOutputType | void> {
    const todo: TodoMongoDbType = await this.todoModel.findById(id).lean();
    if (todo) {
      return convertDbTodosToView(todo);
    }
    // TODO: Ошибку в сервисе выбрасывать или передать в контроллер null например
    // и выбросить ошибку в контроллере ?
    throw new BadRequestException(`Todo with id: ${id} does not exist`);
  }

  async create(createTodoDto: CreateTodoDto): Promise<TodoOutputType> {
    const todos = await this.todoModel.insertMany([createTodoDto]);
    const todo: TodoMongoDbType = todos[0].toJSON();
    return convertDbTodosToView(todo);
  }

  async update(
    id: ObjectId,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoOutputType> {
    // TODO Реализация обновления даты
    // Как пом не костыль, наверняка есть что то подкапотное...
    const data = { ...updateTodoDto, updatedAt: now() };
    const todo = await this.todoModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .lean();
    if (!todo) {
      throw new BadRequestException(`Todo with id: ${id} does not exist`);
    }

    return convertDbTodosToView(todo as TodoMongoDbType);
  }

  async remove(id: ObjectId): Promise<{ message: string }> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    return {
      message: todo
        ? 'Todo has been successfully deleted'
        : `Todo with id: ${id} does not exist`,
    };
  }
}
