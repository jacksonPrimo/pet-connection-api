import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('create')
  create(@Body() body: any) {
    return this.commentService.create(body);
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
