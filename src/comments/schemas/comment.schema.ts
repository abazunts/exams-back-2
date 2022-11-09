import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ default: uuidv4() })
  postId: string;

  @Prop({ default: 'John' })
  name: string;

  @Prop({ default: 'samurai@gmail.com' })
  email: string;

  @Prop()
  body: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
