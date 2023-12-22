import { HttpException, Injectable } from '@nestjs/common';
import { CryptographyUtil } from 'src/utils/cryptography.util';
import prisma from 'src/utils/prisma.util';
@Injectable()
export class UserService {
  constructor(private cryptographyUtil: CryptographyUtil) {}

  async me(params: any) {
    return {
      id: params.authUser.id,
      name: params.authUser.name,
      email: params.authUser.email,
      phone: params.authUser.phone,
      profileImage: params.authUser.profileImage,
      notification: params.authUser.notification,
      notificationLat: params.authUser.notificationLat,
      notificationLng: params.authUser.notificationLng,
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
      await prisma.user.update({
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
