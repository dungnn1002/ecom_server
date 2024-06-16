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
let UserServices = class UserServices {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserServices);
//# sourceMappingURL=user.services.js.map