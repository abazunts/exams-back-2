import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from './schemas/film.schema';
import { CreateFilmDto } from './dto/create-film.dto';

@Injectable()
export class FilmsService {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async findAll() {
    const films = await this.filmModel.find().exec();
    const countDocuments = await this.filmModel.countDocuments();

    return {
      total: countDocuments,
      messages: [],
      page: 1,
      pageCount: 5,
      data: films.map((f) => {
        return {
          id: f._id,
          nameOriginal: f.nameOriginal,
          description: f.description,
          ratingImdb: f.ratingImdb,
        };
      }),
    };
  }

  async create(createFilmDto: CreateFilmDto): Promise<Film> {
    const film = new this.filmModel(createFilmDto);
    return film.save();
  }
}
