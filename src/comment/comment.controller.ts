import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/gauad';
import { CommentService } from './comment.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { addCommentDTO } from './dto/addComment.dto.';
import { PaginationDto } from 'src/share/dto';
@Controller('comment')
export class CommentController {
  constructor(private readonly addressService: CommentService) {}
  @UseGuards(JwtGuard)
  @Post('/add')
  @UseInterceptors(FilesInterceptor('images'))
  async addComment(
    @Body() data: addCommentDTO,
    @UploadedFiles(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image',
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
    return await this.addressService.addComment(data, images);
  }
  @UseGuards(JwtGuard)
  @Get('product/:id')
  async getCommentByProduct(
    @Param('id') productId: number,
    @Query() { page, limit }: PaginationDto,
  ) {
    return await this.addressService.getCommentByProduct(
      +productId,
      +page,
      +limit,
    );
  }
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.addressService.getAll(+page, +limit);
  }
}
