import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(params: any): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { id: params.userId },
    });
    if (!user) {
      throw new HttpException('password or email invalid', 400);
    }
    const data = {
      name: params.name,
      description: params.description,
      chip: params.chip,
      gender: params.gender,
      image: params.image,
      race: params.race,
      situation: params.situation,
      reward: params.reward,
      authorId: user.id,
    };
    try {
      const newPost = await this.prisma.post.create({ data });
      return newPost;
    } catch (e) {
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }

  async find(id: number): Promise<any> {
    const post = await this.prisma.post.findFirst({
      where: { id },
    });
    if (!post) {
      throw new HttpException(
        'Não encontramos uma publicação com este id',
        404,
      );
    } else {
      return post;
    }
  }

  async list(filters: any): Promise<any> {
    console.log(filters);
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async update(id: number, params: any): Promise<any> {
    try {
      const post = await this.prisma.post.update({
        where: { id },
        data: params,
      });
      return post;
    } catch (e) {
      throw new HttpException(
        'Ocorreu um erro ao tentar atualizar os campos selecionados',
        422,
      );
    }
  }
}
