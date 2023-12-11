import { Controller, Get, Body, Patch } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  findOne(@Body() body: any) {
    return this.userService.me(body);
  }

  @Patch('/')
  update(@Body() body: any) {
    return this.userService.update(body);
  }
}
