import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addCommentDTO } from './dto/addComment.dto.';
import { getKeyByFilename } from 'src/utils/get-key-by-filename.util';
import { UploadService } from '../upload/upload.service';
import { messageSuccess } from 'src/share/message';
import { httpErrors } from 'src/share/exception';
@Injectable()
export class CommentService {
  private readonly logger = new Logger(UploadService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly uploadService: UploadService,
  ) {}
  async addComment(data: addCommentDTO, images: Express.Multer.File[]) {
    const uploadedUrls: string[] = [];
    try {
      const comment = await this.prismaService.comment.create({
        data: {
          content: data.content,
          userId: +data.userId,
          productId: +data.productId,
          star: +data.star,
        },
      });

      for (const image of images) {
        const key = `comment/${comment.id}/${getKeyByFilename(image.originalname)}`;
        const { url } = await this.uploadService.uploadFile(image, key);
        this.logger.log(`Uploaded ${url}`);
        uploadedUrls.push(url);
        await this.prismaService.commentImage.create({
          data: {
            commentId: comment.id,
            image_url: url,
          },
        });
      }

      return messageSuccess.COMMENT_ADD_SUCCESS;
    } catch (error) {
      this.logger.error(error?.message || 'Create comment failed');
      for (const url of uploadedUrls) {
        await this.uploadService.deleteFileS3(url);
        this.logger.log(`Deleted ${url}`);
      }
      throw new BadRequestException({
        success: false,
        message: error?.message || 'Create comment failed',
        data: null,
      });
    }
  }
  async getCommentByProduct(productId: number, page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);
    const comment = await this.prismaService.comment.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        productId: +productId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            image: true,
          },
        },
        CommentImage: true,
      },
    });
    return {
      data: comment,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.product.count()) / limit,
        ),
      },
    };
  }
}
