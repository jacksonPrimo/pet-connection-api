import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MailUtil } from 'src/utils/mail.util';

@Module({
  controllers: [PostController],
  providers: [PostService, MailUtil],
})
export class PostModule {}
