import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PostsService } from './posts.service';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { UpdatePostDto } from './dto/update-post.dto';
import { DelayPostDto } from './dto/delay-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  removeOne(
    @Param('id', new IdValidationPipe()) id: ObjectId,
    @Query() delayPostDto: DelayPostDto,
  ) {
    return this.postsService.removeOne(id, delayPostDto);
  }

  @Delete()
  removeMany() {
    return this.postsService.removeMany();
  }

  // @Post()
  // createOne(@Body() createPostDto: CreatePostDto) {
  //   return this.postsService.createOne(createPostDto);
  // }

  @Post('/stub-array')
  createMany() {
    return this.postsService.createMany();
  }
}
