import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../articles/articles.entity';
import { CreateCommentDto } from './comments.dto';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
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

    const comment = this.commentRepository.create(commentInput);

    article.comments.push(comment);

    await this.articleRepository.save(article);

    return comment;
  }
}
