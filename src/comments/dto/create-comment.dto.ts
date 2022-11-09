import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @Length(5, 300)
  @IsString()
  body: string;
}
