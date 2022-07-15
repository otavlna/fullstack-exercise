import { Length } from 'class-validator';

export class CreateCommentDto {
  @Length(1, 50)
  author!: string;

  @Length(1, 500)
  content!: string;
}
