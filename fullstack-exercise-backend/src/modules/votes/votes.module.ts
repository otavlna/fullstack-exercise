import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comments/comments.entity';
import { Vote } from './votes.entity';
import { VotesGateway } from './votes.gateway';
import { VotesService } from './votes.service';

@Module({
  providers: [VotesService, VotesGateway],
  imports: [TypeOrmModule.forFeature([Vote, Comment])],
})
export class VotesModule {}
