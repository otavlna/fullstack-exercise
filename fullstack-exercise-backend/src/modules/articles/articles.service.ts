import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ArticlesShortRes,
  CreateArticleDto,
  UpdateArticleDto,
} from './articles.dto';
import { Article } from './articles.entity';
import { Request } from 'express';
import { UserFromRequestDto } from '../users/users.dto';
import { REQUEST } from '@nestjs/core';
import { ArticlesErrorDescriptions } from './articles.errorDescriptions';

@Injectable({ scope: Scope.REQUEST })
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @Inject(REQUEST) private request: Request & { user: UserFromRequestDto },
  ) {}

  async create(articleInput: CreateArticleDto): Promise<Article> {
    return await this.articlesRepository.save({
      ...articleInput,
      userId: this.request.user.id,
    });
  }

  async findOne(id: number): Promise<Article> {
    const article: Article | null = await this.articlesRepository.findOne({
      where: { id: id },
      relations: { comments: true, user: true },
    });
    if (article !== null) {
      return article;
    } else {
      throw new NotFoundException(ArticlesErrorDescriptions.NotFound);
    }
  }

  async findAll(): Promise<ArticlesShortRes | null> {
    const articles = await this.articlesRepository.find({
      relations: { comments: true, user: true },
    });

    return new ArticlesShortRes({ articles: articles });
  }

  async findUsersArticles(): Promise<ArticlesShortRes | null> {
    const articles = await this.articlesRepository.findBy({
      userId: this.request.user.id,
    });

    return new ArticlesShortRes({ articles: articles });
  }

  async update(
    id: number,
    articleInput: UpdateArticleDto,
  ): Promise<Article | null> {
    const article = await this.articlesRepository.findOne({
      where: { id },
    });
    if (article === null) {
      throw new NotFoundException(ArticlesErrorDescriptions.NotFound);
    }
    if (article.userId !== this.request.user.id) {
      throw new UnauthorizedException(
        ArticlesErrorDescriptions.UnauthorizedEdit,
      );
    }

    await this.articlesRepository.update({ id }, articleInput);
    return await this.articlesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Article | null> {
    const article = await this.articlesRepository.findOne({
      where: { id },
    });
    if (article === null) {
      throw new NotFoundException(ArticlesErrorDescriptions.NotFound);
    }
    if (article.userId !== this.request.user.id) {
      throw new UnauthorizedException(
        ArticlesErrorDescriptions.UnauthorizedDelete,
      );
    }
    return await this.articlesRepository.remove(article);
  }
}
