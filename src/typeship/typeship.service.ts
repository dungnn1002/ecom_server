import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { httpErrors } from 'src/share/exception';
import { MessageDto } from 'src/share/dto';
import { TypeShip } from 'prisma/prisma-client';
import { addTypeShipDTO } from './dto/addTypeShip.dto';
@Injectable()
export class TypeShipService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);

    const typeships = await this.prismaService.typeShip.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: typeships,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.typeShip.count()) / limit,
        ),
      },
    };
  }
  async addTypeShip(
    data: addTypeShipDTO,
  ): Promise<{ message: MessageDto; typeShip: TypeShip }> {
    const existName = await this.prismaService.typeShip.findUnique({
      where: {
        name: data.name,
      },
    });
    if (existName)
      throw new HttpException(httpErrors.BRAND_EXIST, HttpStatus.BAD_REQUEST);

    const typeShip = await this.prismaService.typeShip.create({
      data: {
        name: data.name,
        price: data.price,
      },
    });

    return { message: httpErrors.TYPE_SHIP_ADD_SUCCESS, typeShip };
  }
}
