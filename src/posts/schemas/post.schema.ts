import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  body: string;

  @Prop({ default: uuidv4() })
  userId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
