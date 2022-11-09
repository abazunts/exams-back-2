import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, now } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
  @Prop()
  title: string;

  @Prop({ default: false })
  completed: boolean;

  // TODO Разобраться как правильно увеличивать / уменьшать order
  // при добавлении / удалении тудушки
  @Prop({ default: 1 })
  order: number;

  // TODO Типизация для дат Date ?
  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
