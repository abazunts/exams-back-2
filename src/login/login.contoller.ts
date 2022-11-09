import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { DelayMeDto } from './dto/delay-me.dto';

@ApiTags('auth')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('/login')
  createOne(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }

  @Get('/me')
  getMe(@Query() delayMeDto: DelayMeDto) {
    return this.loginService.me(delayMeDto);
  }
}
