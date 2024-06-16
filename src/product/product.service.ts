import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from 'src/share/dto';
import { ProductImage, Size, Status } from 'prisma/prisma-client';
import { httpErrors } from 'src/share/exception';
import { UploadService } from '../upload/upload.service';
import { getKeyByFilename } from 'src/utils/get-key-by-filename.util';
import { editProductDTO, addProductDTO } from './dto';
import { messageSuccess } from 'src/share/message';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(UploadService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}
  async addProduct(
    data: addProductDTO,
    images: Express.Multer.File[],
  ): Promise<{ message: MessageDto }> {
    const product_image: ProductImage[] = [];
    const uploadedUrls: string[] = [];

    try {
      const product = await this.prismaService.product.create({
        data: {
          name: data.name,
          material: data.material,
          originalPrice: +data.originalPrice,
          discountPrice: +data.discountPrice,
          brandId: +data.brandId,
          categoryId: +data.categoryId,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
          status: 'ACTIVE' as Status,
        },
      });
      for (const size of data.sizes) {
        const sizeData = await this.prismaService.productSize.create({
          data: {
            size: size.size as Size,
            quantity: +size.quantity,
            productId: product.id,
          },
        });
      }

      for (const image of images) {
        const key = `product/${product.id}/${getKeyByFilename(image.originalname)}`;
        const { url } = await this.uploadService.uploadFile(image, key);
        this.logger.log(`Uploaded ${url}`);
        uploadedUrls.push(url);
        const uploaded = await this.prismaService.productImage.create({
          data: {
            productId: product.id,
            image_url: url,
          },
        });
        product_image.push(uploaded);
      }
      return { message: httpErrors.CATEGORY_ADD_SUCCESS };
    } catch (error) {
      this.logger.error(error?.message || 'Create product failed');
      for (const url of uploadedUrls) {
        await this.uploadService.deleteFileS3(url);
        this.logger.log(`Deleted ${url}`);
      }
      throw new BadRequestException({
        success: false,
        message: error?.message || 'Create room failed',
        data: null,
      });
    }
  }
  async findAllProduct(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);
    const products = await this.prismaService.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
          },
        },
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        ProductImage: true,
        ProductSize: true,
      },
    });
    return {
      data: products,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.product.count()) / limit,
        ),
      },
    };
  }
  async findById(id: number) {
    return await this.prismaService.product.findUnique({
      where: {
        id: +id,
      },
      include: {
        brand: {
          select: {
            name: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
        ProductImage: true,
        ProductSize: true,
      },
    });
  }

  async getProductById(id: number) {
    const product = await this.findById(id);
    if (!product)
      throw new HttpException(
        httpErrors.PRODUCT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return product;
  }
  async editProduct(
    id: number,
    data: editProductDTO,
    images: Express.Multer.File[],
  ) {
    const product = await this.findById(id);

    if (!product)
      throw new HttpException(
        httpErrors.PRODUCT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    const product_image: ProductImage[] = [];
    const uploadedUrls: string[] = [];
    try {
      const updatedProduct = await this.prismaService.product.update({
        where: {
          id: +id,
        },
        data: {
          name: data.name,
          material: data.material,
          originalPrice: +data.originalPrice,
          discountPrice: +data.discountPrice,
          brandId: +data.brandId,
          categoryId: +data.categoryId,
          contentHTML: data.contentHTML,
          contentMarkdown: data.contentMarkdown,
        },
      });
      if (!updatedProduct)
        throw new HttpException(
          httpErrors.PRODUCT_UPDATE_FAILED,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      await this.prismaService.productImage.deleteMany({
        where: {
          productId: +id,
        },
      });
      for (const image of images) {
        const key = `product/${product.id}/${getKeyByFilename(image.originalname)}`;
        const { url } = await this.uploadService.uploadFile(image, key);
        this.logger.log(`Uploaded ${url}`);
        uploadedUrls.push(url);
        const uploaded = await this.prismaService.productImage.create({
          data: {
            productId: product.id,
            image_url: url,
          },
        });
        product_image.push(uploaded);
      }
      return messageSuccess.PRODUCT_UPDATE_SUCCESS;
    } catch (error) {
      this.logger.error(error?.message || 'Update product failed');
      for (const url of uploadedUrls) {
        await this.uploadService.deleteFileS3(url);
        this.logger.log(`Deleted ${url}`);
      }
      throw new BadRequestException({
        success: false,
        message: error?.message || 'Update room failed',
        data: null,
      });
    }
  }
  async deleteProduct(id: number) {
    await this.prismaService.product.delete({
      where: {
        id: +id,
      },
    });
    return messageSuccess.PRODUCT_DELETE_SUCCESS;
  }
}
