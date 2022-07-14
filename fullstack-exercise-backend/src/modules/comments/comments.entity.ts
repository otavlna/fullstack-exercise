import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from '../articles/articles.entity';
import { Vote, VoteTypes } from '../votes/votes.entity';

@Entity()
export class Comment {
  @Column()
  author!: string;

  @Column()
  content!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Article, (article) => article.comments)
  article!: Article;

  @OneToMany(() => Vote, (vote) => vote.comment)
  votes!: VoteTypes[];
}
