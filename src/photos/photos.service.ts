import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Photo, PhotoDocument } from './schema/photo.schema';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import {
  convertDbPhotosToView,
  PhotoMongoDbType,
  PhotoOutputType,
} from './utils/convert-db-photos-to-view';
import { DelayPhotoDto } from './dto/delay-photo.dto';
import { delayUtils } from '../common/utils/delay.utils';

@Injectable()
export class PhotosService {
  constructor(
    @InjectModel(Photo.name) private photoModel: Model<PhotoDocument>,
  ) {}

  async findAll(delayPhotoDto: DelayPhotoDto): Promise<PhotoOutputType[]> {
    const photos = await this.photoModel.find().lean().exec();
    if (delayPhotoDto) {
      await delayUtils(delayPhotoDto.delay);
    }
    return photos.map(convertDbPhotosToView);
  }

  async findOne(id: ObjectId): Promise<PhotoOutputType | void> {
    const photo: PhotoMongoDbType = await this.photoModel.findById(id).lean();
    if (photo) {
      return convertDbPhotosToView(photo);
    }
    throw new BadRequestException(`Photo with id: ${id} doesn't found`);
  }

  async update(
    id: ObjectId,
    updatePhotoDto: UpdatePhotoDto,
  ): Promise<PhotoOutputType | { message: string }> {
    const photo = await this.photoModel
      .findByIdAndUpdate(id, updatePhotoDto, {
        new: true,
      })
      .lean();

    if (!photo) {
      return { message: `Photo with id: ${id} does not exist` };
    }

    return convertDbPhotosToView(photo as PhotoMongoDbType);
  }

  // async create(createPhotoDto: CreatePhotoDto): Promise<PhotoOutputType> {
  //   const photos = await this.photoModel.insertMany([createPhotoDto]);
  //   const photo: PhotoMongoDbType = photos[0].toJSON();
  //   return convertDbPhotosToView(photo);
  // }
  //
  // async remove(id: ObjectId): Promise<{ message: string }> {
  //   const photo = await this.photoModel.findByIdAndDelete(id);
  //   return {
  //     message: photo
  //       ? 'Photo has been successfully deleted'
  //       : `Photo with id: ${id} does not exist`,
  //   };
  // }
}
