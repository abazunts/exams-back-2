import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {
  CommentMongoDbType,
  CommentOutputType,
  convertDbCommentsToView,
} from './utils/convert-db-comments-to-view';
import { getRandomText } from '../common/utils/random-text.utils';
import { getRandomComments } from './stub-comments/stub-comments';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async findAll(): Promise<CommentOutputType[]> {
    const comments = await this.commentModel.find().lean().exec();
    return comments.map(convertDbCommentsToView);
  }

  async create(createCommentDto: CreateCommentDto): Promise<CommentOutputType> {
    const countDocuments = await this.commentModel.countDocuments();
    if (countDocuments > 99) {
      await this.removeMany();
      await this.createMany();
    }

    const randomComment = getRandomText(10);
    const comments = await this.commentModel.insertMany([
      { ...createCommentDto, body: randomComment },
    ]);
    const comment: CommentMongoDbType = comments[0].toJSON();
    return convertDbCommentsToView(comment);
  }

  async createMany(): Promise<{ message: string }> {
    await this.commentModel.insertMany(getRandomComments(5));
    return { message: 'Stub comments was created' };
  }

  async remove(id: ObjectId): Promise<{ message: string }> {
    const comment = await this.commentModel.findByIdAndDelete(id);
    return {
      message: comment
        ? 'Comment has been successfully deleted'
        : `Comment with id: ${id} does not exist`,
    };
  }

  async removeMany(): Promise<{ message: string }> {
    await this.commentModel.deleteMany();
    return { message: 'All comments removed' };
  }

  async update(
    id: ObjectId,
    updateCommentDto: UpdateCommentDto,
  ): Promise<CommentOutputType | { message: string }> {
    const comment = await this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, {
        new: true,
      })
      .lean();

    if (!comment) {
      return { message: `Comment with id: ${id} does not exist` };
    }

    return convertDbCommentsToView(comment as CommentMongoDbType);
  }
}
