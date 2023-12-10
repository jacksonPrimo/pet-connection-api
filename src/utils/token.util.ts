import { HttpException, Injectable } from '@nestjs/common';
import { decode, sign, TokenExpiredError, verify } from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  userId: string;
}

@Injectable()
export class TokenUtil {
  private secret = 'apenasumtest';
  private jwtExpiration = 604800; // 1 week

  public generateToken(payload: any) {
    const token = sign({ ...payload }, this.secret, {
      expiresIn: this.jwtExpiration,
    });
    return token;
  }

  public async validateToken(token: string) {
    try {
      return verify(token, this.secret);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new HttpException('token expired!', 401);
      } else {
        throw new HttpException('token not valid!', 401);
      }
    }
  }

  public decodeToken(token: string): TokenPayload {
    const decoded = decode(token);
    return decoded as TokenPayload;
  }
}
