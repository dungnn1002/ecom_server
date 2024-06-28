import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class OrderService {
  constructor(private readonly prismaService: PrismaService) {}
  async getAll(page: number, limit: number) {
    const listorder = await this.prismaService.orderProduct.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        TypeShip: true,
        Voucher: true,
        addressUser: {
          include: {
            user: true,
          },
        },
      },
    });
    return listorder;
  }
  async getOrderById(id: number) {
    const order = await this.prismaService.orderProduct.findUnique({
      where: {
        id: +id,
      },
      include: {
        OrderDetaill: {
          include: {
            productSize: {
              select: {
                size: true,
                product: {
                  select: {
                    name: true,
                    discountPrice: true,
                    ProductImage: {
                      select: {
                        image_url: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        TypeShip: true,
        Voucher: true,
        addressUser: true,
      },
    });
    return order;
  }
}
