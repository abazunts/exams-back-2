// TODO: Где этот класс хранить ?
// Смущает дублирование
import { ApiProperty } from '@nestjs/swagger';

export class TodoOutput {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  order: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

// Error
export class TodoError {
  @ApiProperty({
    default: `Todo with id: % does not exist`,
  })
  errors: string;
}
