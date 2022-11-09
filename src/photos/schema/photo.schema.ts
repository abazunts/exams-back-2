import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type PhotoDocument = Photo & Document;

@Schema()
export class Photo {
  @Prop({ default: uuidv4() })
  albumId: string;

  @Prop()
  title: string;

  @Prop()
  url: string;
}

export const PhotoSchema = SchemaFactory.createForClass(Photo);
