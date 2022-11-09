import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  convertDbUsersToView,
  UserMongoDbType,
  UserOutputType,
} from './utils/convert-db-users-to-view';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserOutputType[]> {
    const users = await this.userModel.find().lean().exec();
    return users.map(convertDbUsersToView);
  }

  // async findOne(id: ObjectId): Promise<UserOutputType> {
  //   const user: UserMongoDbType = await this.userModel.findById(id).lean();
  //   if (user) {
  //     return convertDbUsersToView(user);
  //   }
  //   throw new BadRequestException(`User with id: ${id} doesn't found`);
  // }
  //
  // async create(createUserDto: CreateUserDto): Promise<UserOutputType> {
  //   const users = await this.userModel.insertMany([createUserDto]);
  //   const user: UserMongoDbType = users[0].toJSON();
  //   return convertDbUsersToView(user);
  // }
  //
  // async remove(id: ObjectId): Promise<{ message: string }> {
  //   const user = await this.userModel.findByIdAndDelete(id);
  //   return {
  //     message: user
  //       ? 'User has been successfully deleted'
  //       : `User with id: ${id} does not exist`,
  //   };
  // }
  //
  // async update(
  //   id: ObjectId,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<UserOutputType | { message: string }> {
  //   const user = await this.userModel
  //     .findByIdAndUpdate(id, updateUserDto, {
  //       new: true,
  //     })
  //     .lean();
  //
  //   if (!user) {
  //     return { message: `User with id: ${id} does not exist` };
  //   }
  //
  //   return convertDbUsersToView(user as UserMongoDbType);
  // }
}
