import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiCookieAuth, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ArticleApiResShort,
  ArticlesShortRes,
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
  @ApiCookieAuth('access-token')
  @ApiResponse({ status: 201, type: ArticleApiResShort })
  create(@Body() articleInput: CreateArticleDto) {
    return this.articlesService.create(articleInput);
  }

  @Get()
  @ApiResponse({ status: 200, type: ArticlesShortRes })
  findAll(): Promise<ArticlesShortRes | null> {
    return this.articlesService.findAll();
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access-token')
  @ApiResponse({ status: 200, type: ArticlesShortRes })
  findAdmin(): Promise<ArticlesShortRes | null> {
    return this.articlesService.findUsersArticles();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Article })
  @ApiResponse({ status: 404, description: ArticlesErrorDescriptions.NotFound })
  findOne(@Param('id') id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access-token')
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
  @ApiCookieAuth('access-token')
  @ApiResponse({
    status: 401,
    description: ArticlesErrorDescriptions.UnauthorizedDelete,
  })
  @ApiResponse({ status: 404, description: ArticlesErrorDescriptions.NotFound })
  remove(@Param('id') id: number) {
    return this.articlesService.remove(id);
  }
}
