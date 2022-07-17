import {
  Inject,
  Injectable,
  NotFoundException,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto, UpdateArticleDto } from './articles.dto';
import { Article } from './articles.entity';
import { Request } from 'express';
import { UserFromRequestDto } from '../users/users.dto';
import { REQUEST } from '@nestjs/core';

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

  async findOne(id: number): Promise<Article | null> {
    const article: Article | null = await this.articlesRepository.findOne({
      where: { id: id },
      relations: { comments: true, user: true },
    });
    if (article !== null) {
      return article;
    } else {
      throw new NotFoundException('Article with specified ID not found');
    }
  }

  async findAll(): Promise<Article[] | null> {
    return await this.articlesRepository.find();
  }

  async findUsersArticles(): Promise<Article[] | null> {
    return await this.articlesRepository.findBy({
      userId: this.request.user.id,
    });
  }

  async update(
    id: number,
    articleInput: UpdateArticleDto,
  ): Promise<Article | null> {
    const article = await this.articlesRepository.findOne({
      where: { id },
    });
    if (article === null) {
      throw new NotFoundException('Article with specified ID not found');
    }
    if (article.userId !== this.request.user.id) {
      throw new UnauthorizedException("You can not edit other user's articles");
    }

    await this.articlesRepository.update({ id }, articleInput);
    return await this.articlesRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Article | null> {
    const article = await this.articlesRepository.findOne({
      where: { id },
    });
    if (article === null) {
      throw new NotFoundException('Article with specified ID not found');
    }
    if (article.userId !== this.request.user.id) {
      throw new UnauthorizedException(
        "You can not delete other user's articles",
      );
    }
    return await this.articlesRepository.remove(article);
  }
}
