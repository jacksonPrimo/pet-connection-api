import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { CryptographyUtil } from 'src/utils/cryptography.util';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, CryptographyUtil],
})
export class UserModule {}
