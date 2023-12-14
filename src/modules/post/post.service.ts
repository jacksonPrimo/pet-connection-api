import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MailUtil } from 'src/utils/mail.util';

@Injectable()
export class PostService {
  constructor(
    private prisma: PrismaService,
    private mail: MailUtil,
  ) {}

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
      this.notifyCloseUsers(newPost);
      return newPost;
    } catch (e) {
      console.log(e);
      throw new HttpException('Ocorreu um erro inesperado', 500);
    }
  }

  private async notifyCloseUsers(post: any): Promise<any> {
    const latDegrees = 5 / 111;
    const lngDegrees = 5 / (111 * Math.cos(post.addressLat * (Math.PI / 180)));

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          not: post.authorId,
        },
        notification: true,
        notificationLat: {
          lte: post.addressLat + latDegrees,
          gte: post.addressLat - latDegrees,
        },
        notificationLng: {
          lte: post.addressLng + lngDegrees,
          gte: post.addressLng - lngDegrees,
        },
      },
    });

    users.forEach((user) => {
      this.mail.sendEmail({
        to: user.email,
        subject: 'Novo Cadastro Próximo de Sua Região de interesse',
        text: `
          🐶 Saudações ${user.name} 🐶
          Houve um novo cadastro que pode ser de seu interesse próximo da região onde você selecionou
          segue o link do cadastro: ${process.env.SITE_URL}/posts?postId=${post.id}
        `,
        html: `
          <h1>🐶 Saudações ${user.name} 🐶</h1>
          <p>Houve um novo cadastro que pode ser de seu interesse próximo da região onde você selecionou<p>
          <p>segue o link do cadastro: <a href="${process.env.SITE_URL}/posts?postId=${post.id}" target="_blank">Novo Cadastro</a>
        `,
      });
    });
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
      orderBy: {
        postedAt: 'desc',
      },
      take: limit,
      skip,
    });
    return posts;
  }

  async myPosts(params, user): Promise<any> {
    const page = params.page ? +params.page : 1;
    const limit = params.itemsPerPage ? +params.itemsPerPage : 10;
    const skip = (page - 1) * limit;

    const posts = await this.prisma.post.findMany({
      where: {
        name: {
          contains: params.name || '',
        },
        authorId: user.id,
      },
      take: limit,
      skip,
    });
    const total = await this.prisma.post.count();
    return { posts, total };
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
          addressLng: params.addressLng,
          addressLat: params.addressLat,
          addressLabel: params.addressLabel,
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

  async delete(id: string, user: any): Promise<any> {
    try {
      await this.prisma.post.delete({
        where: {
          id,
          authorId: user.id,
        },
      });
      return { success: true };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Ocorreu um erro ao tentar deletar a publicação selecionada',
        422,
      );
    }
  }
}
