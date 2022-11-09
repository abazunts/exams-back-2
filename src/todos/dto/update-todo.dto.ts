import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTodoDto {
  @IsBoolean()
  @ApiProperty()
  completed: boolean;
}
