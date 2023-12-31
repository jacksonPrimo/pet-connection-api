import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenUtil } from 'src/utils/token.util';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { PrismaInstance } from 'src/utils/prisma.util';

@Module({
  providers: [
    AuthService,
    TokenUtil,
    CryptographyUtil,
    {
      provide: PrismaInstance,
      useValue: PrismaInstance.getInstance(),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
