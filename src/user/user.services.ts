import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddressUser, Gender, Role, User } from '@prisma/client';
import { HttpException, HttpStatus } from '@nestjs/common';
import { httpErrors } from '../share/exception';
import { MessageDto, ResponseDto } from 'src/share/dto';
import { addOrderDTO, addUserDTO, editProfileDTO, editUserDTO } from './dto';
import * as argon from 'argon2';
import { messageSuccess } from 'src/share/message';
import { UploadService } from 'src/upload/upload.service';
import { getKeyByFilename } from 'src/utils/get-key-by-filename.util';
@Injectable()
export class UserServices {
  private readonly logger = new Logger(UploadService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

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
  async getShipAddress(userId: number): Promise<AddressUser[]> {
    return await this.prismaService.addressUser.findMany({
      where: {
        userId: +userId,
      },
    });
  }
  async editProfile(
    userId: number,
    data: editProfileDTO,
    image: Express.Multer.File,
  ) {
    try {
      // Kiểm tra userId có hợp lệ không
      if (!userId || isNaN(userId)) {
        throw new BadRequestException('User ID is invalid');
      }

      // Kiểm tra xem user có tồn tại không
      const existingUser = await this.prismaService.user.findUnique({
        where: { id: +userId },
      });

      if (!existingUser) {
        throw new BadRequestException('User not found');
      }
      // Cập nhật thông tin người dùng
      const user = await this.prismaService.user.update({
        where: {
          id: +userId,
        },
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          address: data.address,
          gender: data.gender as Gender,
          dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        },
      });

      const key = `avatar/${user.id}/${getKeyByFilename(image[0].originalname)}`;
      const { url } = await this.uploadService.uploadFile(image[0], key);
      // Xóa ảnh cũ nếu có
      if (existingUser.image) {
        await this.uploadService.deleteFileS3(existingUser.image[0]);
      }

      // Cập nhật URL ảnh mới trong cơ sở dữ liệu
      await this.prismaService.user.update({
        where: {
          id: +userId,
        },
        data: {
          image: url,
        },
      });

      // Log thành công
      this.logger.log(`Uploaded ${url}`);

      return messageSuccess.USER_UPDATE;
    } catch (error) {
      // Log lỗi và throw ra ngoại lệ với thông báo chi tiết
      this.logger.error(error?.message || 'Update user failed');
      throw new BadRequestException({
        success: false,
        message: error?.message || 'Update user failed',
        data: null,
      });
    }
  }
  async addOrder(data: addOrderDTO) {
    try {
      const product = await this.prismaService.orderProduct.create({
        data: {
          addressUserId: +data.addressUserId,
          isPaymentOnline: +data.isPaymentOnline,
          typeShipId: +data.typeShipId,
          voucherId: +data.voucherId,
          totalPrice: +data.totalPrice,
        },
      });
      for (const item of data.shopCart) {
        await this.prismaService.orderDetaill.create({
          data: {
            orderId: +product.id,
            productSizeId: +item.productSizeId,
            quantity: +item.quantity,
          },
        });
      }
      const userId = await this.prismaService.addressUser.findUnique({
        where: {
          id: +data.addressUserId,
        },
        select: {
          userId: true,
        },
      });
      await this.prismaService.shopCart.deleteMany({
        where: {
          userId: +userId.userId,
        },
      });
      for (const item of data.shopCart) {
        await this.prismaService.productSize.update({
          where: {
            id: +item.productSizeId,
          },
          data: {
            quantity: {
              decrement: +item.quantity,
            },
          },
        });
      }
      await this.prismaService.voucherUsed.create({
        data: {
          userId: +userId.userId,
          voucherId: +data.voucherId,
        },
      });
      return messageSuccess.ORDER_ADD_SUCCESS;
    } catch (error) {
      // Log lỗi và throw ra ngoại lệ với thông báo chi tiết
      this.logger.error(error?.message || 'Update user failed');
      throw new BadRequestException({
        success: false,
        message: error?.message || 'Update user failed',
        data: null,
      });
    }
  }
}
