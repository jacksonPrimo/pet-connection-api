import { HttpException, Injectable } from '@nestjs/common';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { TokenUtil } from 'src/utils/token.util';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenUtil: TokenUtil,
    private cryptographyUtil: CryptographyUtil,
    private prisma: PrismaService,
  ) {}
  async signup(params: any): Promise<any> {
    const encryptPassword = this.cryptographyUtil.encryptPassword(
      params.password,
    );
    const data = {
      encryptPassword,
      email: params.email,
      name: params.name,
    };
    try {
      await this.prisma.user.create({ data });
      const tokenCreated = this.tokenUtil.generateToken({ email: data.email });
      return { accessToken: tokenCreated };
    } catch (e) {
      console.log(e);
    }
  }
  async signin(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user) {
      throw new HttpException('password or email invalid', 400);
    }
    const passwordIsValid = this.cryptographyUtil.comparePassword(
      password,
      user.encryptPassword,
    );
    if (!passwordIsValid) {
      throw new HttpException('password or email invalid', 400);
    }
    const tokenCreated = this.tokenUtil.generateToken({ email, id: user.id });

    return { accessToken: tokenCreated };
  }
}
