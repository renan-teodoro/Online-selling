import { CreateUserDto } from './dto/createUser.dto';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async createUser(createUser: CreateUserDto): Promise<UserEntity> {
    const passwordRounds = Number(process.env.PASSWORD_HASH_ROUNDS);
    const hashedPassword = await bcrypt.hash(
      createUser.password,
      passwordRounds,
    );

    return this.userRepository.save({
      ...createUser,
      password: hashedPassword,
    });
  }
}
