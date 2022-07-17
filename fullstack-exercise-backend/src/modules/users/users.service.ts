import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | null> {
    const usernameLowercase = username.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { username: usernameLowercase },
    });

    return user;
  }
}
