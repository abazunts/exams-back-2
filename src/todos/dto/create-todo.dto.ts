import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @Length(1, 100)
  @IsString()
  @ApiProperty({
    description: 'Todo title',
    minimum: 1,
    maximum: 100,
  })
  title: string;
}
