import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';
import { User } from '../users/users.entity';

@Entity()
export class Article {
  @Column()
  title!: string;

  @Column()
  perex!: string;

  @Column()
  content!: string;

  @Column()
  fileName!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments!: Comment[];

  @Column({ type: 'int', nullable: true })
  userId!: number;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' })
  user!: User;
}
