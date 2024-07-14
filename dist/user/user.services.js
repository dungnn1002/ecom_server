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
exports.UserServices = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
const exception_1 = require("../share/exception");
const argon = require("argon2");
const message_1 = require("../share/message");
const upload_service_1 = require("../upload/upload.service");
const get_key_by_filename_util_1 = require("../utils/get-key-by-filename.util");
let UserServices = class UserServices {
    constructor(prismaService, uploadService) {
        this.prismaService = prismaService;
        this.uploadService = uploadService;
        this.logger = new common_1.Logger(upload_service_1.UploadService.name);
    }
    async findById(userId) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        });
    }
    async getUserInfoById(userId) {
        const user = await this.findById(userId);
        if (!user)
            throw new common_2.HttpException(exception_1.httpErrors.USER_NOT_FOUND, common_2.HttpStatus.NOT_FOUND);
        delete user.password;
        return user;
    }
    async getAll(page, limit, phoneNumber) {
        if (isNaN(page) || isNaN(limit))
            throw new common_2.HttpException(exception_1.httpErrors.QUERY_INVALID, common_2.HttpStatus.BAD_REQUEST);
        const users = await this.prismaService.user.findMany({
            where: {
                phoneNumber: {
                    contains: phoneNumber,
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });
        const modifiedUsers = users.map((user) => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return {
            data: modifiedUsers,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.user.count()) / limit),
            },
        };
    }
    async checkUserExist(data) {
        const { email, phoneNumber } = data;
        if (email) {
            const emailExist = await this.prismaService.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (emailExist)
                return exception_1.httpErrors.EMAIL_EXISTED;
        }
        if (phoneNumber) {
            const phoneNumberExist = await this.prismaService.user.findUnique({
                where: {
                    phoneNumber: phoneNumber,
                },
            });
            if (phoneNumberExist)
                return exception_1.httpErrors.PHONE_EXISTED;
        }
        return false;
    }
    async addUser(data) {
        const userExist = await this.checkUserExist({
            email: data.email,
            phoneNumber: data.phoneNumber,
        });
        const hashedPassword = await argon.hash(data.password);
        if (userExist)
            throw new common_2.HttpException(userExist, common_2.HttpStatus.BAD_REQUEST);
        const user = await this.prismaService.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId,
                address: data.address,
                dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                gender: data.gender,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });
        return { message: message_1.messageSuccess.USER_REGISTER, user };
    }
    async editUser(id, data) {
        await this.prismaService.user.update({
            where: {
                id: +id,
            },
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                roleId: data.roleId,
                address: data.address,
                gender: data.gender,
                dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
            },
        });
        return message_1.messageSuccess.USER_UPDATE;
    }
    async deleteUser(id) {
        await this.prismaService.user.delete({
            where: {
                id: +id,
            },
        });
        return message_1.messageSuccess.USER_DELETE;
    }
    async getShopCart(userId) {
        const shopCart = await this.prismaService.shopCart.findMany({
            where: {
                userId,
            },
            include: {
                productSize: {
                    include: {
                        product: {
                            select: {
                                name: true,
                                discountPrice: true,
                            },
                        },
                    },
                },
            },
        });
        const productImageId = shopCart.map((item) => item.productSize.productId);
        const productImages = await this.prismaService.productImage.findMany({
            where: {
                productId: {
                    in: productImageId,
                },
            },
        });
        return {
            data: shopCart.map((item) => {
                const productImage = productImages.find((image) => image.productId === item.productSize.productId);
                return {
                    ...item,
                    productSize: {
                        ...item.productSize,
                        productImage: productImage?.image_url || '',
                    },
                };
            }),
        };
    }
    async getShipAddress(userId) {
        return await this.prismaService.addressUser.findMany({
            where: {
                userId: +userId,
            },
        });
    }
    async editProfile(userId, data, image) {
        try {
            if (!userId || isNaN(userId)) {
                throw new common_1.BadRequestException('User ID is invalid');
            }
            const existingUser = await this.prismaService.user.findUnique({
                where: { id: +userId },
            });
            if (!existingUser) {
                throw new common_1.BadRequestException('User not found');
            }
            const user = await this.prismaService.user.update({
                where: {
                    id: +userId,
                },
                data: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    gender: data.gender,
                    dob: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
                },
            });
            const key = `avatar/${user.id}/${(0, get_key_by_filename_util_1.getKeyByFilename)(image[0].originalname)}`;
            const { url } = await this.uploadService.uploadFile(image[0], key);
            if (existingUser.image) {
                await this.uploadService.deleteFileS3(existingUser.image[0]);
            }
            await this.prismaService.user.update({
                where: {
                    id: +userId,
                },
                data: {
                    image: url,
                },
            });
            this.logger.log(`Uploaded ${url}`);
            return message_1.messageSuccess.USER_UPDATE;
        }
        catch (error) {
            this.logger.error(error?.message || 'Update user failed');
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || 'Update user failed',
                data: null,
            });
        }
    }
    async addOrder(data) {
        try {
            const product = await this.prismaService.orderProduct.create({
                data: {
                    addressUserId: +data.addressUserId,
                    isPaymentOnline: +data.isPaymentOnline,
                    typeShipId: +data.typeShipId,
                    voucherId: +data.voucherId,
                    totalPrice: +data.totalPrice,
                },
            });
            for (const item of data.shopCart) {
                await this.prismaService.orderDetaill.create({
                    data: {
                        orderId: +product.id,
                        productSizeId: +item.productSizeId,
                        quantity: +item.quantity,
                    },
                });
            }
            const userId = await this.prismaService.addressUser.findUnique({
                where: {
                    id: +data.addressUserId,
                },
                select: {
                    userId: true,
                },
            });
            await this.prismaService.shopCart.deleteMany({
                where: {
                    userId: +userId.userId,
                },
            });
            for (const item of data.shopCart) {
                await this.prismaService.productSize.update({
                    where: {
                        id: +item.productSizeId,
                    },
                    data: {
                        quantity: {
                            decrement: +item.quantity,
                        },
                    },
                });
            }
            await this.prismaService.voucher.update({
                where: {
                    id: +data.voucherId,
                },
                data: {
                    amount: {
                        decrement: 1,
                    },
                },
            });
            await this.prismaService.voucherUsed.create({
                data: {
                    userId: +userId.userId,
                    voucherId: +data.voucherId,
                },
            });
            return message_1.messageSuccess.ORDER_ADD_SUCCESS;
        }
        catch (error) {
            this.logger.error(error?.message || 'Update user failed');
            throw new common_1.BadRequestException({
                success: false,
                message: error?.message || 'Update user failed',
                data: null,
            });
        }
    }
    async getOrderByUser(userId) {
        const addressId = await this.prismaService.addressUser.findMany({
            where: {
                userId: +userId,
            },
            select: {
                id: true,
            },
        });
        return await this.prismaService.orderProduct.findMany({
            where: {
                addressUserId: {
                    in: addressId.map((item) => item.id),
                },
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
            },
        });
    }
    async getVoucherUsedByUserId(userId) {
        return await this.prismaService.voucherUsed.findMany({
            where: {
                userId: +userId,
            },
        });
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        upload_service_1.UploadService])
], UserServices);
//# sourceMappingURL=user.services.js.map