import { IsAlphanumeric, Length } from 'class-validator';

export class ValidateUserDto {
  @Length(3, 50)
  @IsAlphanumeric()
  username!: string;

  @Length(8, 256)
  password!: string;
}
