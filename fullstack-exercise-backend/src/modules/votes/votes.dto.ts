import { Exclude, Expose } from 'class-transformer';
import { IsEnum, IsNumber } from 'class-validator';
import { Comment } from '../comments/comments.entity';
import { VoteTypes } from './votes.entity';

export class CreateVoteDto {
  @IsEnum(VoteTypes)
  type!: VoteTypes;

  @IsNumber()
  commentId!: number;
}

export class ResponseVoteDto {
  @Exclude()
  ip!: number;

  @Expose()
  type!: VoteTypes;

  @Expose()
  id!: number;

  @Expose()
  comment!: Comment;
}
