import { createUserDto } from './dto/createUser.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  async getAllUsers() {
    return JSON.stringify({
      name: 'User',
    });
  }

  @Post()
  async createUser(@Body() createUser: createUserDto) {
    return {
      ...createUser,
      password: undefined,
    };
  }
}
