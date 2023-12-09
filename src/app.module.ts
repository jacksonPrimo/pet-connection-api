import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [AuthModule, PostModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
