import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma.service';
import { PostModule } from './modules/post/post.module';
import { AuthenticatedMiddleware } from './middlewares/authenticated/authenticated.middleware';
import { TokenUtil } from './utils/token.util';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [AuthModule, PostModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, TokenUtil],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticatedMiddleware).forRoutes('/post', '/user');
  }
}
