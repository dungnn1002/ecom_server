import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Gender, Role, User } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { httpErrors } from '../share/exception';
import { MessageDto, ResponseDto } from 'src/share/dto';
import { addUserDTO, editUserDTO } from './dto';
import * as argon from 'argon2';
import { messageSuccess } from 'src/share/message';
@Injectable()
export class UserServices {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(userId: number): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async getUserInfoById(userId: number): Promise<User | null> {
    const user = await this.findById(userId);
    if (!user)
      throw new HttpException(httpErrors.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    delete user.password;
    return user;
  }

  async getAll(
    page: number,
    limit: number,
    phoneNumber: string,
  ): Promise<ResponseDto<Omit<User, 'password'>[]>> {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);
    const users = await this.prismaService.user.findMany({
      where: {
        phoneNumber: {
          contains: phoneNumber,
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const modifiedUsers = users.map((user) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    return {
      data: modifiedUsers,
      pagination: {
        totalPage: Math.ceil((await this.prismaService.user.count()) / limit),
      },
    };
  }
  async checkUserExist(data: {
    email?: string;
    phoneNumber?: string;
  }): Promise<MessageDto | false> {
    const { email, phoneNumber } = data;
    if (email) {
      const emailExist = await this.prismaService.user.findUnique({
        where: {
          email: email,
        },
      });
      if (emailExist) return httpErrors.EMAIL_EXISTED;
    }
    if (phoneNumber) {
      const phoneNumberExist = await this.prismaService.user.findUnique({
        where: {
          phoneNumber: phoneNumber,
        },
      });
      if (phoneNumberExist) return httpErrors.PHONE_EXISTED;
    }
    return false;
  }
  async addUser(data: addUserDTO) {
    const userExist = await this.checkUserExist({
      email: data.email,
      phoneNumber: data.phoneNumber,
    });
    const hashedPassword = await argon.hash(data.password);

    if (userExist) throw new HttpException(userExist, HttpStatus.BAD_REQUEST);

    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId as Role,
        address: data.address,
        dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        gender: data.gender as Gender,
      },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return { message: messageSuccess.USER_REGISTER, user };
  }

  async editUser(id: number, data: editUserDTO) {
    await this.prismaService.user.update({
      where: {
        id: +id,
      },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        roleId: data.roleId as Role,
        address: data.address,
        gender: data.gender as Gender,
        dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      },
    });
    return messageSuccess.USER_UPDATE;
  }
  async deleteUser(id: number) {
    await this.prismaService.user.delete({
      where: {
        id: +id,
      },
    });
    return messageSuccess.USER_DELETE;
  }

  async getShopCart(userId: number) {
    const shopCart = await this.prismaService.shopCart.findMany({
      where: {
        userId,
      },
      include: {
        productSize: {
          include: {
            product: {
              select: {
                name: true,
                discountPrice: true,
              },
            },
          },
        },
      },
    });
    const productImageId = shopCart.map((item) => item.productSize.productId);
    const productImages = await this.prismaService.productImage.findMany({
      where: {
        productId: {
          in: productImageId,
        },
      },
    });
    return {
      data: shopCart.map((item) => {
        const productImage = productImages.find(
          (image) => image.productId === item.productSize.productId,
        );
        return {
          ...item,
          productSize: {
            ...item.productSize,
            productImage: productImage?.image_url || '',
          },
        };
      }),
    };
  }
}
