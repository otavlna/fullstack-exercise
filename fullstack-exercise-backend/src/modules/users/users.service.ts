import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { usersSeed } from './users.seed';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onModuleInit(): Promise<void> {
    // if (this.configService.get('NODE_ENV') === 'development') {
    //   await this.seedDatabase();
    // }
    await this.seedDatabase();
  }

  async findOne(username: string): Promise<User | null> {
    const usernameLowercase = username.toLowerCase();
    const user = await this.usersRepository.findOne({
      where: { username: usernameLowercase },
    });

    return user;
  }

  async seedDatabase() {
    const saltOrRounds = 10;
    if ((await this.usersRepository.count()) === 0) {
      for (const userSeed of usersSeed) {
        userSeed.password = await bcrypt.hash(userSeed.password, saltOrRounds);
        await this.usersRepository.save(usersSeed);
      }
    }
  }
}
