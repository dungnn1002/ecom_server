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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
const upload_service_1 = require("../upload/upload.service");
const get_key_by_filename_util_1 = require("../utils/get-key-by-filename.util");
const message_1 = require("../share/message");
let ProductService = class ProductService {
    constructor(prismaService, uploadService) {
        this.prismaService = prismaService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(upload_service_1.UploadService.name);
    }
    async addProduct(data, images) {
        const product_image = [];
        const uploadedUrls = [];
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
                    status: 'ACTIVE',
                },
            });
            for (const size of data.sizes) {
                const sizeData = await this.prismaService.productSize.create({
                    data: {
                        size: size.size,
                        quantity: +size.quantity,
                        productId: product.id,
                    },
                });
            }
            for (const image of images) {
                const key = `product/${product.id}/${(0, get_key_by_filename_util_1.getKeyByFilename)(image.originalname)}`;
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
            return { message: exception_1.httpErrors.CATEGORY_ADD_SUCCESS };
        }
        catch (error) {
            this.logger.error(error?.message || 'Create product failed');
            for (const url of uploadedUrls) {
                await this.uploadService.deleteFileS3(url);
                this.logger.log(`Deleted ${url}`);
            }
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || 'Create room failed',
                data: null,
            });
        }
    }
    async findAllProductByFilter(page, limit, brandId, categoryId, name, sort, order) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const products = await this.prismaService.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
                brandId: brandId ? +brandId : undefined,
                categoryId: categoryId ? +categoryId : undefined,
                name: name ? { contains: name } : undefined,
            },
            orderBy: {
                [sort]: order,
            },
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
                totalPage: Math.ceil((await this.prismaService.product.count({
                    where: {
                        brandId: brandId ? +brandId : undefined,
                        categoryId: categoryId ? +categoryId : undefined,
                        name: name ? { contains: name } : undefined,
                    },
                })) / limit),
            },
        };
    }
    async findAllProduct(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
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
                totalPage: Math.ceil((await this.prismaService.product.count()) / limit),
            },
        };
    }
    async findById(productId) {
        return this.prismaService.product.findUnique({
            where: {
                id: productId,
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
    async getProductById(id) {
        const product = await this.findById(id);
        if (!product)
            throw new common_1.HttpException(exception_1.httpErrors.PRODUCT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        return product;
    }
    async editProduct(id, data, images) {
        const product = await this.findById(id);
        if (!product)
            throw new common_1.HttpException(exception_1.httpErrors.PRODUCT_NOT_FOUND, common_1.HttpStatus.NOT_FOUND);
        const product_image = [];
        const uploadedUrls = [];
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
                throw new common_1.HttpException(exception_1.httpErrors.PRODUCT_UPDATE_FAILED, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            await this.prismaService.productImage.deleteMany({
                where: {
                    productId: +id,
                },
            });
            for (const image of images) {
                const key = `product/${product.id}/${(0, get_key_by_filename_util_1.getKeyByFilename)(image.originalname)}`;
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
            return message_1.messageSuccess.PRODUCT_UPDATE_SUCCESS;
        }
        catch (error) {
            this.logger.error(error?.message || 'Update product failed');
            for (const url of uploadedUrls) {
                await this.uploadService.deleteFileS3(url);
                this.logger.log(`Deleted ${url}`);
            }
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || 'Update room failed',
                data: null,
            });
        }
    }
    async deleteProduct(id) {
        await this.prismaService.product.delete({
            where: {
                id: +id,
            },
        });
        return message_1.messageSuccess.PRODUCT_DELETE_SUCCESS;
    }
    async getTopProduct() {
        const listProduct = await this.prismaService.orderDetaill.groupBy({
            by: ['productSizeId'],
            _count: {
                productSizeId: true,
            },
            orderBy: {
                _count: {
                    productSizeId: 'desc',
                },
            },
            take: 10,
        });
        const topProduct = await Promise.all(listProduct.map(async (product) => {
            const productSize = await this.prismaService.productSize.findUnique({
                where: {
                    id: product.productSizeId,
                },
                include: {
                    product: {
                        include: {
                            ProductImage: true,
                        },
                    },
                },
            });
            return productSize;
        }));
        return topProduct;
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], ProductService);
//# sourceMappingURL=product.service.js.map