import { IsNumber, IsPositive, IsString, Length } from 'class-validator';

export class CreateFilmDto {
  @Length(2, 50)
  @IsString()
  nameOriginal: string;

  @Length(10, 400)
  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  ratingImdb: number;
}
