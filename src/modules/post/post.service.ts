import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(params: any): Promise<any> {
    try {
      const newPost = await this.prisma.post.create({
        data: {
          name: params.name,
          description: params.description,
          chip: params.chip,
          gender: params.gender,
          image: params.image,
          race: params.race,
          situation: params.situation,
          reward: params.reward,
          authorId: params.authUser.id,
          addressLabel: params.addressLabel,
          addressLat: params.addressLat,
          addressLng: params.addressLng,
        },
      });
      return newPost;
    } catch (e) {
      console.log(e);
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }

  async find(id: string): Promise<any> {
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
    const query = {
      name: {
        contains: filters.name || '',
      },
      chip: {
        contains: filters.chip || '',
      },
    };
    if (filters.situation && filters.situation.length) {
      query['situation'].in = filters.situation;
    }
    if (filters.race && filters.race.length) {
      query['race'].in = filters.race;
    }
    if (filters.biggerThanLat && filters.smallerThanLat) {
      query['addressLat'] = {
        lte: +filters.biggerThanLat,
        gte: +filters.smallerThanLat,
      };
    }
    if (filters.biggerThanLng && filters.smallerThanLng) {
      query['addressLng'] = {
        lte: +filters.biggerThanLng,
        gte: +filters.smallerThanLng,
      };
    }

    const page = filters.page ? +filters.page : 0;
    const limit = 24;
    const skip = page * limit;

    const posts = await this.prisma.post.findMany({
      where: query,
      take: limit,
      skip,
    });
    return posts;
  }

  async update(id: string, params: any): Promise<any> {
    try {
      const post = await this.prisma.post.update({
        where: {
          id,
          authorId: params.authUser.id,
        },
        data: {
          name: params.name,
          description: params.description,
          chip: params.chip,
          gender: params.gender,
          image: params.image,
          race: params.race,
          situation: params.situation,
          reward: params.reward,
        },
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
