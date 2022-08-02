import { IsEnum, IsNumber } from 'class-validator';
import { VoteTypes } from './votes.entity';

export class CreateVoteDto {
  @IsEnum(VoteTypes)
  type!: VoteTypes;

  @IsNumber()
  commentId!: number;
}

export class ResponseVoteDto {
  constructor(partial: Partial<ResponseVoteDto>) {
    Object.assign(this, partial);
  }

  score!: number;
  commentId!: number;
}
