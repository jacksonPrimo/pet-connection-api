import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(params: any) {
    try {
      const newComment = await this.prisma.comment.create({
        data: {
          description: params.description,
          authorId: params.authUser.id,
          postId: params.postId,
        },
      });
      return {
        ...newComment,
        author: {
          profileImage: params.authUser.profileImage,
          id: params.authUser.id,
        },
      };
    } catch (e) {
      console.log(e);
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }

  async list(params: any) {
    const page = params.page ? +params.page : 1;
    const limit = params.limit ? +params.limit : 10;
    const skip = (page - 1) * limit;
    const comments = await this.prisma.comment.findMany({
      where: {
        postId: params.postId,
      },
      select: {
        id: true,
        description: true,
        author: {
          select: {
            profileImage: true,
            id: true,
          },
        },
      },
      orderBy: {
        postedAt: 'desc',
      },
      take: limit,
      skip,
    });
    const totalComments = await this.prisma.comment.count();
    const total = Math.ceil(totalComments / limit);
    return { comments, total };
  }

  async remove(id: string, user: any) {
    await this.prisma.comment.delete({
      where: { id, authorId: user.id },
    });
  }
}
