import { IsOptional, IsString, Length } from 'class-validator';

export class UpdatePostDto {
  @Length(5, 100)
  @IsString()
  title: string;

  @Length(10, 300)
  @IsString()
  @IsOptional()
  body: string;
}
