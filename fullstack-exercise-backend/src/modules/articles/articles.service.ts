import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto, UpdateArticleDto } from './articles.dto';
import { Article } from './articles.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(articleInput: CreateArticleDto): Promise<Article> {
    return await this.articleRepository.save(articleInput);
  }

  async findOne(id: number): Promise<Article | null> {
    const article: Article | null = await this.articleRepository.findOne({
      where: { id: id },
      relations: { comments: true },
    });
    if (article !== null) {
      return article;
    } else {
      throw new NotFoundException('Article with specified ID not found');
    }
  }

  async findAll(): Promise<Article[] | null> {
    return await this.articleRepository.find();
  }

  async update(
    id: number,
    articleInput: UpdateArticleDto,
  ): Promise<Article | null> {
    await this.articleRepository.update({ id }, articleInput);
    return await this.articleRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Article | null> {
    const article: Article | null = await this.articleRepository.findOneBy({
      id,
    });
    if (article === null) {
      throw new NotFoundException('Article with specified ID not found');
    }
    return await this.articleRepository.remove(article);
  }
}
