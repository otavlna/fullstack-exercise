import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVoteDto } from './votes.dto';
import { Vote } from './votes.entity';
import { Socket } from 'socket.io';
import { Comment } from '../comments/comments.entity';
import { VotesErrors } from './votes.errors';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async vote(
    createVoteInput: CreateVoteDto,
    client: Socket,
  ): Promise<VotesErrors | Vote> {
    const comment = await this.commentsRepository.findOne({
      where: { id: createVoteInput.commentId },
    });

    if (comment === null) {
      return VotesErrors.CommentDoesNotExist;
    }

    // find vote if user has already voted
    const ip = client.conn.remoteAddress;
    const voteFromThisUser = await this.votesRepository
      .createQueryBuilder('vote')
      .leftJoinAndSelect('vote.comment', 'comment')
      .where('comment.id = :id', { id: comment.id })
      .andWhere('vote.ip = :ip', { ip: ip })
      .getOne();

    // if vote type is the same then return an error
    if (
      voteFromThisUser !== null &&
      voteFromThisUser.type === createVoteInput.type
    ) {
      return VotesErrors.AlreadyVoted;
    }
    // if vote type is different then update that vote
    else if (
      voteFromThisUser !== null &&
      voteFromThisUser.type !== createVoteInput.type
    ) {
      await this.votesRepository.update(voteFromThisUser.id, {
        type: createVoteInput.type,
      });

      const vote = await this.votesRepository.findOneOrFail({
        where: {
          id: voteFromThisUser.id,
        },
        relations: {
          comment: true,
        },
      });
      return vote;
    }
    // if user hasn't voted yet then create new vote
    else {
      const vote = await this.votesRepository.save({
        comment: comment,
        type: createVoteInput.type,
        ip: ip,
      });

      const voteProper = await this.votesRepository.findOneOrFail({
        where: {
          id: vote.id,
        },
        relations: {
          comment: true,
        },
      });
      return voteProper;
    }
  }

  async getScore(commentId: number): Promise<number | undefined> {
    const comment = await this.commentsRepository.findOneBy({ id: commentId });
    const votes = comment?.votes.map((vote) => vote.type);
    return votes?.reduce((a, b) => a + b, 0);
  }
}
