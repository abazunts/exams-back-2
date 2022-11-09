import { IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateUserDto {
  @Length(1, 50)
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}
