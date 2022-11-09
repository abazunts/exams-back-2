import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id', new IdValidationPipe()) id: ObjectId) {
  //   return this.usersService.findOne(id);
  // }
  //
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id', new IdValidationPipe()) id: ObjectId) {
  //   return this.usersService.remove(id);
  // }
  //
  // @Put(':id')
  // update(
  //   @Param('id', new IdValidationPipe()) id: ObjectId,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   return this.usersService.update(id, updateUserDto);
  // }
}
