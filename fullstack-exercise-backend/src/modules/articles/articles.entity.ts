import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';
import { Image } from '../images/images.entity';

@Entity()
export class Article {
  @Column()
  title!: string;

  @Column()
  perex!: string;

  @Column()
  content!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments!: Comment[];

  @OneToOne(() => Image, (image) => image.article)
  @JoinColumn()
  image?: Image;
}
