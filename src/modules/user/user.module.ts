import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { PrismaInstance } from 'src/utils/prisma.util';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CryptographyUtil,
    {
      provide: PrismaInstance,
      useValue: PrismaInstance.getInstance(),
    },
  ],
})
export class UserModule {}
