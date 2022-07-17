import { OmitType } from '@nestjs/swagger';
import { IsOptional, Length } from 'class-validator';
import { Article } from './articles.entity';

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

export class ArticleApiResShort extends OmitType(Article, [
  'comments',
  'user',
] as const) {}
