import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('articles')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth('access-token')
  create(
    @Body() commentInput: CreateCommentDto,
    @Param('id') articleId: number,
  ) {
    return this.commentsService.create(commentInput, articleId);
  }
}
