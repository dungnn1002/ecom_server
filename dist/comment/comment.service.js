"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const get_key_by_filename_util_1 = require("../utils/get-key-by-filename.util");
const upload_service_1 = require("../upload/upload.service");
const message_1 = require("../share/message");
const exception_1 = require("../share/exception");
let CommentService = class CommentService {
    constructor(prismaService, uploadService) {
        this.prismaService = prismaService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(upload_service_1.UploadService.name);
    }
    async addComment(data, images) {
        const uploadedUrls = [];
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
                const key = `comment/${comment.id}/${(0, get_key_by_filename_util_1.getKeyByFilename)(image.originalname)}`;
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
            return message_1.messageSuccess.COMMENT_ADD_SUCCESS;
        }
        catch (error) {
            this.logger.error(error?.message || 'Create comment failed');
            for (const url of uploadedUrls) {
                await this.uploadService.deleteFileS3(url);
                this.logger.log(`Deleted ${url}`);
            }
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || 'Create comment failed',
                data: null,
            });
        }
    }
    async getCommentByProduct(productId, page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
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
                totalPage: Math.ceil((await this.prismaService.product.count()) / limit),
            },
        };
    }
    async getAll(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const comment = await this.prismaService.comment.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: comment,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.product.count()) / limit),
            },
        };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], CommentService);
//# sourceMappingURL=comment.service.js.map