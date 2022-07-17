import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ArticleApiResShort,
  CreateArticleDto,
  UpdateArticleDto,
} from './articles.dto';
import { Article } from './articles.entity';
import { ArticlesErrorDescriptions } from './articles.errorDescriptions';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 201, type: ArticleApiResShort })
  create(@Body() articleInput: CreateArticleDto) {
    return this.articlesService.create(articleInput);
  }

  @Get()
  @ApiResponse({ status: 200, type: [ArticleApiResShort] })
  findAll(): Promise<Article[] | null> {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404, description: ArticlesErrorDescriptions.NotFound })
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ArticleApiResShort })
  @ApiResponse({
    status: 401,
    description: ArticlesErrorDescriptions.UnauthorizedEdit,
  })
  @ApiResponse({ status: 404, description: ArticlesErrorDescriptions.NotFound })
  update(@Param('id') id: number, @Body() articleInput: UpdateArticleDto) {
    return this.articlesService.update(id, articleInput);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: ArticleApiResShort })
  @ApiBearerAuth()
  @ApiResponse({
    status: 401,
    description: ArticlesErrorDescriptions.UnauthorizedDelete,
  })
  @ApiResponse({ status: 404, description: ArticlesErrorDescriptions.NotFound })
  remove(@Param('id') id: number) {
    return this.articlesService.remove(id);
  }
}
