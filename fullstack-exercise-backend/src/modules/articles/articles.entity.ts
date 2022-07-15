import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';

@Entity()
export class Article {
  @Column()
  title!: string;

  @Column()
  perex!: string;

  @Column()
  content!: string;

  @Column()
  imageName!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments!: Comment[];
}
