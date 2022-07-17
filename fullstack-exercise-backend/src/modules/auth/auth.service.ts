import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ValidateUserDto } from './auth.dto';
import { plainToInstance } from 'class-transformer';
import { Validator } from 'class-validator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(userInput: ValidateUserDto): Promise<any> {
    const validator = new Validator();
    const validatedUserInput = plainToInstance(ValidateUserDto, userInput);
    const errors = await validator.validate(validatedUserInput);
    if (errors.length) {
      throw new UnauthorizedException(
        'Username or password is not in valid format',
      );
    }
    const user = await this.usersService.findOne(validatedUserInput.username);
    if (user !== null) {
      const isMatch = await bcrypt.compare(
        validatedUserInput.password,
        user.password,
      );
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
