import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(
    @Body() data: { email: string; password: string },
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.authService.signup(data);
    res.status(200).send(result);
  }

  @Post('signin')
  async signin(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const result = await this.authService.signin(body.email, body.password);
    res.status(200).send(result);
  }
}
