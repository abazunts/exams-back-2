import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema()
export class Film {
  @Prop()
  nameOriginal: string;

  @Prop()
  description: string;

  @Prop()
  ratingImdb: number;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
