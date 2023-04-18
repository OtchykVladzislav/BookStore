import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comment.controller';
import { Comment } from './comment.model';
import { CommentsService } from './comment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
