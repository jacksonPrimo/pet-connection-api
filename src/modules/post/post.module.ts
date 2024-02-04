import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MailUtil } from 'src/utils/mail.util';
import { PrismaInstance } from 'src/utils/prisma.util';

@Module({
  controllers: [PostController],
  providers: [
    PostService,
    MailUtil,
    {
      provide: PrismaInstance,
      useValue: PrismaInstance.getInstance(),
    },
  ],
})
export class PostModule {}
