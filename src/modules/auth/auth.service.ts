import { Injectable } from '@nestjs/common';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { TokenUtil } from 'src/utils/token.util';

@Injectable()
export class AuthService {
  constructor(
    private tokenUtil: TokenUtil,
    private cryptographyUtil: CryptographyUtil,
  ) {}
  async signup(data: any): Promise<any> {
    data.password = this.cryptographyUtil.encryptPassword(data.password);
    const tokenCreated = this.tokenUtil.generateToken({ email: data.email });

    return { accessToken: tokenCreated };
  }
  async signin(email: string, password: string) {
    console.log(password);
    const tokenCreated = this.tokenUtil.generateToken({ email });

    return { accessToken: tokenCreated };
  }
}
