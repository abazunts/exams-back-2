import { IsString, Length } from 'class-validator';

export class CreatePhotoDto {
  @Length(1, 100)
  @IsString()
  title: string;

  @IsString()
  url: string;
}
