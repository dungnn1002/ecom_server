import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { httpErrors } from 'src/share/exception';
import { addBrandDTO } from './dto/addBrand.dto';
import { MessageDto } from 'src/share/dto';
import { Brand } from '@prisma/client';
import { messageSuccess } from 'src/share/message';
@Injectable()
export class BrandService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);

    const brands = await this.prismaService.brand.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: brands,
      pagination: {
        totalPage: Math.ceil((await this.prismaService.brand.count()) / limit),
      },
    };
  }
  async addBrand(
    data: addBrandDTO,
  ): Promise<{ message: MessageDto; brand: Brand }> {
    const existName = await this.prismaService.brand.findUnique({
      where: {
        name: data.name,
      },
    });
    if (existName)
      throw new HttpException(httpErrors.BRAND_EXIST, HttpStatus.BAD_REQUEST);

    const brand = await this.prismaService.brand.create({
      data: {
        name: data.name,
      },
    });
    return { message: httpErrors.BRAND_ADD_SUCCESS, brand };
  }
  async deleteBrand(id: number) {
    await this.prismaService.brand.delete({
      where: {
        id: +id,
      },
    });
    return messageSuccess.BRAND_DELETE_SUCCESS;
  }
}
