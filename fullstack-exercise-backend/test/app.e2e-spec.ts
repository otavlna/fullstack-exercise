import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArticlesModule } from '../src/modules/articles/articles.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Article } from '../src/modules/articles/articles.entity';
import { ArticleApiResShort } from '../src/modules/articles/articles.dto';
import { v4 as uuid } from 'uuid';
import { UsersModule } from '../src/modules/users/users.module';
import { User } from '../src/modules/users/users.entity';

describe('ArticleController (e2e)', () => {
  let app: INestApplication;

  const articleResShort: ArticleApiResShort = {
    title: 'Lorem ipsum',
    perex: 'Lorem ipsum dolor sit amet',
    content:
      'Ipsum magna eu sunt ea et laboris ad minim aliqua id amet ea laboris irure.',
    fileName: `${uuid()}.png`,
    createdAt: new Date(),
    id: 1,
    userId: 1,
  };

  const mockArticlesRepository = {
    find: jest
      .fn()
      .mockImplementation(() => Promise.resolve([articleResShort])),
  };

  const mockUsersRepository = {};

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticlesModule, UsersModule],
    })
      .overrideProvider(getRepositoryToken(Article))
      .useValue(mockArticlesRepository)
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUsersRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/articles (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/articles');
    let prop: keyof typeof articleResShort;
    expect(response.status).toEqual(200);
    for (prop in articleResShort) {
      if (prop !== 'createdAt')
        expect(response.body[0][prop]).toEqual(articleResShort[prop]);
      else
        expect(response.body[0][prop]).toEqual(
          articleResShort[prop].toISOString(),
        );
    }
  });
});
