import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BadRequestTransformationFilter } from '../../filters/BadRequestTransformationFilter';
import { CreateVoteDto, ResponseVoteDto } from './votes.dto';
import { VotesService } from './votes.service';

import { VotesErrors } from './votes.errors';
import { Vote } from './votes.entity';
import { plainToInstance } from 'class-transformer';

@WebSocketGateway()
export class VotesGateway {
  constructor(private votesService: VotesService) {}
  @WebSocketServer()
  server!: Server;

  @SubscribeMessage('newVote')
  @UseFilters(BadRequestTransformationFilter)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async handleMessage(
    @MessageBody() data: CreateVoteDto,
    @ConnectedSocket() client: Socket,
  ): Promise<ResponseVoteDto | void> {
    const voteOrVoteError = await this.votesService.vote(data, client);
    if (voteOrVoteError instanceof Vote) {
      // TODO: only emit to clients that are viewing an article with comment ID
      const vote = plainToInstance(ResponseVoteDto, voteOrVoteError);
      client.broadcast.emit('newVote', vote);
      return vote;
    } else if (voteOrVoteError === VotesErrors.AlreadyVoted) {
      throw new WsException('Your vote has already been registered');
    } else if (voteOrVoteError === VotesErrors.CommentDoesNotExist) {
      throw new WsException('Comment with specified ID does not exist');
    }
  }
}