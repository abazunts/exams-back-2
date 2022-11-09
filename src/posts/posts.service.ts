import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { UpdatePostDto } from './dto/update-post.dto';
import {
  convertDbPostsToView,
  PostMongoDbType,
  PostOutputType,
} from './utils/convert-db-posts-to-view';
import { stubPosts } from './stub-posts/stub-posts';
import { getRandomText } from '../common/utils/random-text.utils';
import { DelayPostDto } from './dto/delay-post.dto';
import { delayUtils } from '../common/utils/delay.utils';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findAll(): Promise<PostOutputType[]> {
    const posts = await this.postModel.find().lean().exec();
    return posts.map(convertDbPostsToView);
  }

  async update(
    id: ObjectId,
    updatePostDto: UpdatePostDto,
  ): Promise<PostOutputType | { message: string }> {
    const newTitle = getRandomText(5);

    const post = await this.postModel
      .findByIdAndUpdate(
        id,
        { ...updatePostDto, title: newTitle },
        {
          new: true,
        },
      )
      .lean();

    if (!post) {
      return { message: `User with id: ${id} does not exist` };
    }

    return convertDbPostsToView(post as PostMongoDbType);
  }

  async removeOne(id: ObjectId, delayPostDto: DelayPostDto) {
    const post = await this.postModel.findByIdAndDelete(id);

    if (!post) {
      return { message: `Post with id: ${id} does not exist` };
    }

    // Если в коллекции меньше 10 документов, создать новую пачку
    const countDocuments = await this.postModel.countDocuments();
    if (countDocuments < 10) {
      await this.createMany();
    }

    if (delayPostDto) {
      await delayUtils(delayPostDto.delay);
    }

    return {
      message: 'Post has been successfully deleted',
    };
  }

  async removeMany(): Promise<{ message: string }> {
    await this.postModel.deleteMany();
    return { message: 'All posts removed' };
  }

  // async createOne(createPostDto: CreatePostDto): Promise<PostOutputType> {
  //   const posts = await this.postModel.insertMany([createPostDto]);
  //   const post: PostMongoDbType = posts[0].toJSON();
  //   return convertDbPostsToView(post);
  // }

  async createMany(): Promise<{ message: string }> {
    await this.postModel.insertMany(stubPosts);
    return { message: 'Stub posts was created' };
  }
}
