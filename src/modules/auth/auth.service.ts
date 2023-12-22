import { HttpException, Injectable } from '@nestjs/common';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import { TokenUtil } from 'src/utils/token.util';
import axios from 'axios';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaInstance } from 'src/utils/prisma.util';
@Injectable()
export class AuthService {
  constructor(
    private tokenUtil: TokenUtil,
    private cryptographyUtil: CryptographyUtil,
    private readonly prisma: PrismaInstance,
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
      const newUser = await this.prisma.user.create({ data });
      const tokenCreated = this.tokenUtil.generateToken({
        userId: newUser.id,
        email: newUser.email,
      });
      return { accessToken: tokenCreated };
    } catch (e) {
      let message = '';
      if (e instanceof PrismaClientKnownRequestError && e.code === 'P2002') {
        message = 'Este email já está em uso';
      } else {
        message = 'Ocorreu um erro inesperado';
      }
      throw new HttpException(message, 422);
    }
  }
  async signinWithGoogle(params: any): Promise<any> {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${params.token}`,
      );
      if (response.status == 200) {
        const data = {
          email: response.data.email,
          name: response.data.email.split('@')[0],
        };
        let user = await this.prisma.user.findFirst({
          where: { email: data.email },
        });
        if (!user) user = await this.prisma.user.create({ data });
        const tokenCreated = this.tokenUtil.generateToken({
          userId: user.id,
          email: user.email,
        });
        return { accessToken: tokenCreated };
      } else {
        throw new HttpException('Token do Google Inválido', 422);
      }
    } catch (e) {
      console.log(e);
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }
  async signin(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });
    if (!user?.encryptPassword) {
      throw new HttpException('Senha ou email incorretos', 400);
    }
    const passwordIsValid = this.cryptographyUtil.comparePassword(
      password,
      user.encryptPassword,
    );
    if (!passwordIsValid) {
      throw new HttpException('Senha ou email incorretos', 400);
    }
    const tokenCreated = this.tokenUtil.generateToken({
      email,
      userId: user.id,
    });

    return { accessToken: tokenCreated };
  }
}
