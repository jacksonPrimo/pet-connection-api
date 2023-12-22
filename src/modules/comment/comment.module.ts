import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaInstance } from 'src/utils/prisma.util';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    {
      provide: PrismaInstance,
      useValue: PrismaInstance.getInstance(),
    },
  ],
})
export class CommentModule {}
