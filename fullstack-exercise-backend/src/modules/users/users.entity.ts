import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Article } from '../articles/articles.entity';

@Entity()
export class User {
  @Column()
  username!: string;

  @Column()
  password!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToMany(() => Article, (article) => article.user, { cascade: true })
  articles!: Article[];
}
