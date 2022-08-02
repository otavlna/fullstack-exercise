import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
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
  @Exclude()
  @OneToMany(() => Vote, (vote) => vote.comment, { eager: true })
  votes!: Vote[];

  @Expose()
  get score(): number | undefined {
    return this.votes?.reduce((a: number, b: Vote) => a + b.type, 0);
  }
}
