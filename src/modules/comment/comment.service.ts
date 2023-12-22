import { HttpException, Injectable } from '@nestjs/common';
import prisma from 'src/utils/prisma.util';

@Injectable()
export class CommentService {
  constructor() {}

  async create(params: any) {
    try {
      const newComment = await prisma.comment.create({
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
    const comments = await prisma.comment.findMany({
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
    const totalComments = await prisma.comment.count({
      where: {
        postId: params.postId,
      },
    });
    const total = Math.ceil(totalComments / limit);
    return { comments, total };
  }

  async remove(id: string, user: any) {
    await prisma.comment.delete({
      where: { id, authorId: user.id },
    });
  }
}
