import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { addProductDTO, editProductDTO } from './dto';
import { JwtGuard } from 'src/auth/gauad';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { FilesInterceptor } from '@nestjs/platform-express';
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @UseGuards(JwtGuard)
  @Post('add-product')
  @UseInterceptors(FilesInterceptor('images'))
  async addProduct(
    @Body() data: addProductDTO,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB
          message: 'Dung lượng file không được vượt quá 5MB',
        })
        .build({
          exceptionFactory: (errors) => {
            throw new BadRequestException({
              success: false,
              message: errors,
              data: null,
            });
          },
        }),
    )
    images: Express.Multer.File[],
  ): Promise<{ message: MessageDto }> {
    return await this.productService.addProduct(data, images);
  }

  @UseGuards(JwtGuard)
  @Get('all-product')
  async getAllProduct(@Query() { page, limit }: PaginationDto) {
    return await this.productService.findAllProduct(+page, +limit);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return { data: await this.productService.getProductById(+id) };
  }

  @UseGuards(JwtGuard)
  @Post('edit-product/:id')
  @UseInterceptors(FilesInterceptor('images'))
  async editCategory(
    @Param('id') id: number,
    @Body() data: editProductDTO,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
        })
        .addMaxSizeValidator({
          maxSize: 1024 * 1024 * 5, // 5MB
          message: 'Dung lượng file không được vượt quá 5MB',
        })
        .build({
          exceptionFactory: (errors) => {
            throw new BadRequestException({
              success: false,
              message: errors,
              data: null,
            });
          },
        }),
    )
    images: Express.Multer.File[],
  ) {
    return { data: await this.productService.editProduct(id, data, images) };
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-product/:id')
  async deleteCategory(@Param('id') id: number) {
    return { data: await this.productService.deleteProduct(id) };
  }
}
