import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Article } from '../articles/articles.entity';

@Entity()
export class Image {
  @Column()
  url!: string;

  @Column()
  alternativeText!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => Article, (article) => article.image)
  article!: Article;
}
