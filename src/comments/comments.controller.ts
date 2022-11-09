import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getAll() {
    return this.commentsService.findAll();
  }

  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Post('/stub-array')
  createMany() {
    return this.commentsService.createMany();
  }

  @Delete(':id')
  remove(@Param('id', new IdValidationPipe()) id: ObjectId) {
    return this.commentsService.remove(id);
  }

  @Delete()
  removeMany() {
    return this.commentsService.removeMany();
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: ObjectId,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }
}
