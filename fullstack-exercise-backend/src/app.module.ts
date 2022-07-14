import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Article } from './modules/articles/articles.entity';
import { ArticlesModule } from './modules/articles/articles.module';
import { Comment } from './modules/comments/comments.entity';
import { CommentsModule } from './modules/comments/comments.module';
import { Image } from './modules/images/images.entity';
import { ImagesModule } from './modules/images/images.module';
import { Vote } from './modules/votes/votes.entity';
import { VotesModule } from './modules/votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([Article, Comment, Image, Vote]),

    ArticlesModule,

    CommentsModule,

    ImagesModule,

    VotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
