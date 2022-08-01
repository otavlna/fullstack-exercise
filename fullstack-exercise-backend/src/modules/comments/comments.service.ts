import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../articles/articles.entity';
import { UserFromRequestDto } from '../users/users.dto';
import { CreateCommentDto } from './comments.dto';
import { Comment } from './comments.entity';

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @Inject(REQUEST) private request: Request & { user: UserFromRequestDto },
  ) {}

  async create(
    commentInput: CreateCommentDto,
    articleId: number,
  ): Promise<Comment> {
    const article: Article | null = await this.articleRepository.findOne({
      where: {
        id: articleId,
      },
      relations: {
        comments: true,
      },
    });

    if (article === null) {
      throw new BadRequestException('Invalid article ID');
    }

    const comment = this.commentRepository.create({
      ...commentInput,
      author: this.request.user.username,
    });

    article.comments.push(comment);

    await this.articleRepository.save(article);

    return comment;
  }
}
