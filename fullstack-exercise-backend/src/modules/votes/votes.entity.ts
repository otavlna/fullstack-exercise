import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';

export enum VoteTypes {
  Upvote = 'UPVOTE',
  Downvote = 'DOWNVOTE',
}

@Entity()
export class Vote {
  @ApiHideProperty()
  @Exclude()
  @Column()
  ip!: string;

  @Column({
    type: 'enum',
    enum: VoteTypes,
    default: VoteTypes.Upvote,
  })
  type!: VoteTypes;

  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Comment, (comment) => comment.votes)
  @JoinColumn()
  comment!: Comment;
}
