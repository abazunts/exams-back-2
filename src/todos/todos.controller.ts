import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ObjectId } from 'mongoose';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { TodoError, TodoOutput } from './swagger/todos.swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [TodoOutput],
  })
  getTodos() {
    return this.todosService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String, description: 'todo id' })
  @ApiResponse({ status: 200, description: 'Success', type: TodoOutput })
  @ApiBadRequestResponse({ type: TodoError })
  getTodo(@Param('id', new IdValidationPipe()) id: ObjectId) {
    return this.todosService.findOne(id);
  }

  @Post()
  @ApiBody({ description: 'Create todo', type: CreateTodoDto })
  @ApiResponse({ status: 200, description: 'Success', type: TodoOutput })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', type: String, description: 'todo id' })
  @ApiBody({ description: 'Update todo', type: UpdateTodoDto })
  @ApiResponse({ status: 200, description: 'Success', type: TodoOutput })
  @ApiBadRequestResponse({ type: TodoError })
  update(
    @Param('id', new IdValidationPipe()) id: ObjectId,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String, description: 'todo id' })
  @ApiResponse({ status: 200, description: 'Success' })
  remove(@Param('id', new IdValidationPipe()) id: ObjectId) {
    return this.todosService.remove(id);
  }
}
