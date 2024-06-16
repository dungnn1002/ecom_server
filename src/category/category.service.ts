import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { httpErrors } from 'src/share/exception';
import { addCategoryDTO } from './dto/addCategory.dto';
import { MessageDto } from 'src/share/dto';
import { Category } from 'prisma/prisma-client';
import { messageSuccess } from 'src/share/message';
import { editCategoryDTO } from './dto/editCategory.dto';
@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  getCondition(brandId: number, name: string) {
    const condition = {};
    if (brandId) {
      condition['brandId'] = {
        equals: brandId,
      };
    }
    if (name) {
      condition['name'] = {
        contains: name,
      };
    }
    return condition;
  }
  async findAll(page: number, limit: number, brandId: number, name: string) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);
    const where = this.getCondition(brandId, name);
    const cateogorys = await this.prismaService.category.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        brand: {
          select: {
            name: true,
          },
        },
      },
    });

    return {
      data: cateogorys,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.category.count()) / limit,
        ),
      },
    };
  }
  async addCateogry(
    data: addCategoryDTO,
  ): Promise<{ message: MessageDto; category: Category }> {
    const existName = await this.prismaService.category.findUnique({
      where: {
        name_brandId: {
          name: data.categoryName,
          brandId: data.brandId,
        },
      },
    });
    if (existName)
      throw new HttpException(
        httpErrors.CATEGORY_EXIST,
        HttpStatus.BAD_REQUEST,
      );

    const category = await this.prismaService.category.create({
      data: {
        name: data.categoryName,
        brand: {
          connect: {
            id: data.brandId,
          },
        },
      },
    });

    return { message: httpErrors.CATEGORY_ADD_SUCCESS, category };
  }

  async deleteCategory(id: number) {
    await this.prismaService.category.delete({
      where: {
        id: +id,
      },
    });
    return messageSuccess.CATEGORY_DELETE_SUCCESS;
  }

  async editCategory(id: number, data: editCategoryDTO) {
    await this.prismaService.category.update({
      where: {
        id: +id,
      },
      data: {
        name: data.name,
        brand: {
          connect: {
            id: +data.brandId,
          },
        },
      },
    });
    return messageSuccess.CATEGORY_UPDATE;
  }
}
