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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllOrderByIdUser(userId) {
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
            select: {
                totalPrice: true,
            },
        });
    }
    async getAll(page, limit) {
        const listorder = await this.prismaService.orderProduct.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                TypeShip: true,
                Voucher: true,
                addressUser: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return listorder;
    }
    async getOrderById(id) {
        const order = await this.prismaService.orderProduct.findUnique({
            where: {
                id: +id,
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
                TypeShip: true,
                Voucher: true,
                addressUser: true,
            },
        });
        return order;
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map