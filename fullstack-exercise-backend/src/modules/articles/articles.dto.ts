import { Transform, Type } from 'class-transformer';
import { IsOptional, Length } from 'class-validator';
import { Article } from './articles.entity';
import { Comment } from '../comments/comments.entity';

export class CreateArticleDto {
  @Length(10, 60)
  title!: string;

  @Length(10, 300)
  perex!: string;

  @Length(10, 5000)
  content!: string;

  @Length(40, 41)
  fileName!: string;
}

export class UpdateArticleDto {
  @IsOptional()
  @Length(10, 60)
  title!: string;

  @IsOptional()
  @Length(10, 300)
  perex!: string;

  @IsOptional()
  @Length(10, 5000)
  content!: string;

  @IsOptional()
  @Length(40, 41)
  fileName!: string;
}

export class ArticlesShortRes {
  @Type(() => ArticleApiResShort)
  articles!: ArticleApiResShort[];

  constructor(partial: Partial<ArticlesShortRes>) {
    Object.assign(this, partial);
  }
}

export class ArticleApiResShort extends Article {
  @Transform(({ value }) => value.length)
  comments!: Comment[];
}
