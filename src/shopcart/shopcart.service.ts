import { addShopCartDTO } from './dto/addShopCart.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { httpErrors } from 'src/share/exception';
import { MessageDto } from 'src/share/dto';
import { messageSuccess } from 'src/share/message';
import { ShopCart } from 'prisma/prisma-client';
@Injectable()
export class ShopCartService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);

    const listCart = await this.prismaService.shopCart.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: listCart,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.shopCart.count()) / limit,
        ),
      },
    };
  }
  async addShopCart(data: addShopCartDTO): Promise<ShopCart> {
    const existProduct = await this.prismaService.shopCart.findUnique({
      where: {
        userId_productSizeId: {
          userId: +data.userId,
          productSizeId: +data.productSizeId,
        },
      },
    });

    if (existProduct) {
      const productSize = await this.prismaService.productSize.findUnique({
        where: {
          id: +data.productSizeId,
        },
      });
      if (existProduct.quantity + +data.quantity > productSize.quantity) {
        throw new HttpException(
          httpErrors.SHOPCART_ADD_FAIL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const shopCart = await this.prismaService.shopCart.update({
          where: {
            id: existProduct.id,
          },
          data: {
            quantity: existProduct.quantity + +data.quantity,
          },
        });
        return shopCart;
      }
    } else {
      const productSize = await this.prismaService.productSize.findUnique({
        where: {
          id: +data.productSizeId,
        },
      });
      if (+data.quantity > productSize.quantity) {
        throw new HttpException(
          httpErrors.SHOPCART_ADD_FAIL,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        const shopCart = await this.prismaService.shopCart.create({
          data: {
            userId: +data.userId,
            productSizeId: +data.productSizeId,
            quantity: +data.quantity,
          },
        });
        return shopCart;
      }
    }
  }

  async deleteShopCart(id: number) {
    const product = await this.prismaService.shopCart.delete({
      where: {
        id: +id,
      },
    });
    return product;
  }
  async updateShopCart(id: number, quantity: number): Promise<ShopCart> {
    const product = await this.prismaService.shopCart.update({
      where: {
        id: +id,
      },
      data: {
        quantity: +quantity,
      },
    });
    return product;
  }
}
