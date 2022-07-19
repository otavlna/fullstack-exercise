import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../articles/articles.entity';
import { CreateCommentDto } from './comments.dto';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;

  const mockCommentsRepository = {
    create: jest.fn().mockImplementation((comment) => ({ id: 10, ...comment })),
  };

  const article = {
    comments: [],
  };
  const mockArticlesRepository = {
    findOne: jest.fn().mockImplementation(() => Promise.resolve(article)),
    save: jest.fn().mockImplementation((article) => Promise.resolve(article)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentsRepository,
        },
        {
          provide: getRepositoryToken(Article),
          useValue: mockArticlesRepository,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new comment and return it', async () => {
    const dto: CreateCommentDto = {
      author: 'Otto von Habsburg',
      content:
        'Occaecat duis ex esse et officia nulla labore consectetur non ipsum nisi culpa.',
    };
    expect(await service.create(dto, 1)).toMatchObject({
      id: expect.any(Number),
      ...dto,
    });
  });
});
