import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaInstance } from 'src/utils/prisma.util';
import { TokenUtil } from 'src/utils/token.util';
@Injectable()
export class AuthenticatedMiddleware implements NestMiddleware {
  constructor(
    private tokenUtil: TokenUtil,
    private readonly prisma: PrismaInstance,
  ) {}
  async use(req: any, res: any, next: () => void) {
    const { authorization } = req.headers;
    if (!authorization) throw new HttpException('Autenticação necessária', 401);
    const [, token] = authorization.split(' ');
    if (!token) throw new HttpException('Autenticação necessária', 401);
    await this.tokenUtil.validateToken(token);
    const { userId } = this.tokenUtil.decodeToken(token);
    const user = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new HttpException('Usuário autenticado não encontrado', 404);
    } else {
      req.body.authUser = user;
      next();
    }
  }
}
