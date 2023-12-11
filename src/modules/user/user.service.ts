import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CryptographyUtil } from 'src/utils/cryptography.util';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private cryptographyUtil: CryptographyUtil,
  ) {}

  async me(params: any) {
    return {
      name: params.authUser.name,
      email: params.authUser.email,
      phone: params.authUser.phone,
      profileImage: params.authUser.profileImage,
      notificaion: params.authUser.notificaion,
      notificaionLat: params.authUser.notificaionLat,
      notificaionLng: params.authUser.notificaionLng,
    };
  }

  async update(params: any) {
    try {
      const data = {};
      if (params.name) data['name'] = params.name;
      if (params.email) data['email'] = params.email;
      if (params.phone) data['phone'] = params.phone;
      if (params.profileImage) data['profileImage'] = params.profileImage;
      if (params.notificationLat)
        data['notificationLat'] = params.notificationLat;
      if (params.notificationLng)
        data['notificationLng'] = params.notificationLng;
      if (params.notification) data['notification'] = params.notification;
      if (params.password) {
        const encryptPassword = this.cryptographyUtil.encryptPassword(
          params.password,
        );
        data['encryptPassword'] = encryptPassword;
      }
      await this.prisma.user.update({
        where: {
          id: params.authUser.id,
        },
        data,
      });
      return { success: true };
    } catch (e) {
      console.log(e);
      throw new HttpException(
        'Ocorreu um erro ao tentar atualizar os campos selecionados',
        422,
      );
    }
  }
}
