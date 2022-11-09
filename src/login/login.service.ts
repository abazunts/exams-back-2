import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Login, LoginDocument } from './schemas/login.schema';
import { CreateLoginDto } from './dto/create-login.dto';
import { DelayMeDto } from './dto/delay-me.dto';
import { delayUtils } from '../common/utils/delay.utils';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(Login.name) private loginModel: Model<LoginDocument>,
  ) {}

  async create(createLoginDto: CreateLoginDto) {
    const email = 'darrell@gmail.com';
    if (createLoginDto.email === email) {
      return {
        token: 'QpwL5tke4Pnpja7X4',
      };
    } else {
      throw new BadRequestException(`Email or password incorrect`);
    }
  }

  async me(delayMeDto: DelayMeDto) {
    if (delayMeDto) {
      await delayUtils(delayMeDto.delay);
    }
    return 'Success me request';
  }
}
