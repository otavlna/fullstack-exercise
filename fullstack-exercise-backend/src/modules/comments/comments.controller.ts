import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from './comments.dto';
import { CommentsService } from './comments.service';

@Controller('articles')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Post(':id/comments')
  create(
    @Body() commentInput: CreateCommentDto,
    @Param('id') articleId: number,
  ) {
    return this.commentsService.create(commentInput, articleId);
  }
}
