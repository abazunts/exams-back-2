import { IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @Length(5, 300)
  @IsString()
  body: string;
}
