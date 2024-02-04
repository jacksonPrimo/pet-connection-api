import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Response } from 'express';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('create')
  async create(@Body() body: any, @Res() res: Response): Promise<any> {
    const result = await this.postService.create(body);
    res.status(201).send(result);
  }

  @Get('/list')
  async list(@Query() queryParams: any, @Res() res: Response): Promise<any> {
    const result = await this.postService.list(queryParams);
    res.status(200).send(result);
  }

  @Get('/my')
  async myPosts(
    @Query() queryParams: any,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.postService.myPosts(queryParams, body.authUser);
    res.status(200).send(result);
  }

  @Get('/:id')
  async find(@Param('id') id: string, @Res() res: Response): Promise<any> {
    const result = await this.postService.find(id);
    res.status(200).send(result);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.postService.update(id, body);
    res.status(200).send(result);
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
  ): Promise<any> {
    const result = await this.postService.delete(id, body.authUser);
    res.status(200).send(result);
  }
}
