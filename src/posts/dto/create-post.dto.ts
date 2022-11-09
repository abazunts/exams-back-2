import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @Length(5, 100)
  @IsString()
  title: string;

  @Length(10, 300)
  @IsString()
  body: string;
}
