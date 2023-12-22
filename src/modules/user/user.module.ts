import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CryptographyUtil } from 'src/utils/cryptography.util';

@Module({
  controllers: [UserController],
  providers: [UserService, CryptographyUtil],
})
export class UserModule {}
