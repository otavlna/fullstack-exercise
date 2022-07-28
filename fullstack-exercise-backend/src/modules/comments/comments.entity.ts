import { ApiHideProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Article } from '../articles/articles.entity';
import { Vote } from '../votes/votes.entity';

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

  @ApiHideProperty()
  @ManyToOne(() => Article, (article) => article.comments)
  article!: Article;

  @ApiHideProperty()
  @OneToMany(() => Vote, (vote) => vote.comment)
  votes!: Vote[];
}
