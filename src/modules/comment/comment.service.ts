import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(params: any) {
    try {
      const newPost = await this.prisma.comment.create({
        data: {
          description: params.description,
          authorId: params.authUser.id,
          postId: params.postId,
        },
      });
      return newPost;
    } catch (e) {
      console.log(e);
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }

  async list(params: any) {
    const page = params.page || 0;
    const limit = 10;
    const skip = page * limit;

    const comments = await this.prisma.comment.findMany({
      where: {
        postId: params.postId,
      },
      take: limit,
      skip,
    });
    return comments;
  }

  async remove(id: string, user: any) {
    await this.prisma.comment.delete({
      where: { id, authorId: user.id },
    });
  }
}
