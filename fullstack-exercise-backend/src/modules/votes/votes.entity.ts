import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Comment } from '../comments/comments.entity';

export enum VoteTypes {
  Upvote = 'UPVOTE',
  Downvote = 'DOWNVOTE',
}

@Entity()
export class Vote {
  @Column({ unique: true })
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
  comment!: Comment;
}
