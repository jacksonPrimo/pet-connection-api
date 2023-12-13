import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service';
import { MailUtil } from 'src/utils/mail.util';

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, MailUtil],
})
export class PostModule {}
