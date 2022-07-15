import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateArticleDto, UpdateArticleDto } from './articles.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  create(@Body() articleInput: CreateArticleDto) {
    return this.articlesService.create(articleInput);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() articleInput: UpdateArticleDto) {
    return this.articlesService.update(id, articleInput);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.articlesService.remove(id);
  }
}
