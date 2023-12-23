import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  async create(@Body() body: any, @Res() res: Response) {
    const result = await this.commentService.create(body);
    res.status(201).send(result);
  }

  @Get('list')
  list(@Query() queryParams: any) {
    return this.commentService.list(queryParams);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Body() body: any) {
    return this.commentService.remove(id, body.authUser);
  }
}
