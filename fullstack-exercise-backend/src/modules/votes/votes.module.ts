import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VotesController } from './votes.controller';
import { Vote } from './votes.entity';
import { VotesService } from './votes.service';

@Module({
  controllers: [VotesController],
  providers: [VotesService],
  imports: [TypeOrmModule.forFeature([Vote])],
})
export class VotesModule {}
