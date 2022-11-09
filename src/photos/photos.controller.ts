import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PhotosService } from './photos.service';
import { IdValidationPipe } from '../common/pipes/id-validation.pipe';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { DelayPhotoDto } from './dto/delay-photo.dto';

@ApiTags('photos')
@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Get()
  getPhotos(@Query() delayPhotoDto: DelayPhotoDto) {
    return this.photosService.findAll(delayPhotoDto);
  }

  @Get(':id')
  getPhoto(@Param('id', new IdValidationPipe()) id: ObjectId) {
    return this.photosService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new IdValidationPipe()) id: ObjectId,
    @Body() updatePhotoDto: UpdatePhotoDto,
  ) {
    return this.photosService.update(id, updatePhotoDto);
  }

  // @Post()
  // create(@Body() createPhotoDto: CreatePhotoDto) {
  //   return this.photosService.create(createPhotoDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id', new IdValidationPipe()) id: ObjectId) {
  //   return this.photosService.remove(id);
  // }
}
