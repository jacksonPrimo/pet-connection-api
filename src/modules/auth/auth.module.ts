import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenUtil } from 'src/utils/token.util';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [AuthService, TokenUtil, CryptographyUtil, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
