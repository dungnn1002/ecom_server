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
exports.ShopCartService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
let ShopCartService = class ShopCartService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const listCart = await this.prismaService.shopCart.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: listCart,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.shopCart.count()) / limit),
            },
        };
    }
    async addShopCart(data) {
        const existProduct = await this.prismaService.shopCart.findUnique({
            where: {
                userId_productSizeId: {
                    userId: +data.userId,
                    productSizeId: +data.productSizeId,
                },
            },
        });
        if (existProduct) {
            const productSize = await this.prismaService.productSize.findUnique({
                where: {
                    id: +data.productSizeId,
                },
            });
            if (existProduct.quantity + +data.quantity > productSize.quantity) {
                throw new common_1.HttpException(exception_1.httpErrors.SHOPCART_ADD_FAIL, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const shopCart = await this.prismaService.shopCart.update({
                    where: {
                        id: existProduct.id,
                    },
                    data: {
                        quantity: existProduct.quantity + +data.quantity,
                    },
                });
                return shopCart;
            }
        }
        else {
            const productSize = await this.prismaService.productSize.findUnique({
                where: {
                    id: +data.productSizeId,
                },
            });
            if (+data.quantity > productSize.quantity) {
                throw new common_1.HttpException(exception_1.httpErrors.SHOPCART_ADD_FAIL, common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                const shopCart = await this.prismaService.shopCart.create({
                    data: {
                        userId: +data.userId,
                        productSizeId: +data.productSizeId,
                        quantity: +data.quantity,
                    },
                });
                return shopCart;
            }
        }
    }
    async deleteShopCart(id) {
        const product = await this.prismaService.shopCart.delete({
            where: {
                id: +id,
            },
        });
        return product;
    }
    async updateShopCart(id, quantity) {
        const product = await this.prismaService.shopCart.update({
            where: {
                id: +id,
            },
            data: {
                quantity: +quantity,
            },
        });
        return product;
    }
};
exports.ShopCartService = ShopCartService;
exports.ShopCartService = ShopCartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShopCartService);
//# sourceMappingURL=shopcart.service.js.map