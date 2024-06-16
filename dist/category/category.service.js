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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
const message_1 = require("../share/message");
let CategoryService = class CategoryService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getCondition(brandId, name) {
        const condition = {};
        if (brandId) {
            condition['brandId'] = {
                equals: brandId,
            };
        }
        if (name) {
            condition['name'] = {
                contains: name,
            };
        }
        return condition;
    }
    async findAll(page, limit, brandId, name) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const where = this.getCondition(brandId, name);
        const cateogorys = await this.prismaService.category.findMany({
            where,
            skip: (page - 1) * limit,
            take: limit,
            include: {
                brand: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return {
            data: cateogorys,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.category.count()) / limit),
            },
        };
    }
    async addCateogry(data) {
        const existName = await this.prismaService.category.findUnique({
            where: {
                name_brandId: {
                    name: data.categoryName,
                    brandId: data.brandId,
                },
            },
        });
        if (existName)
            throw new common_1.HttpException(exception_1.httpErrors.CATEGORY_EXIST, common_1.HttpStatus.BAD_REQUEST);
        const category = await this.prismaService.category.create({
            data: {
                name: data.categoryName,
                brand: {
                    connect: {
                        id: data.brandId,
                    },
                },
            },
        });
        return { message: exception_1.httpErrors.CATEGORY_ADD_SUCCESS, category };
    }
    async deleteCategory(id) {
        await this.prismaService.category.delete({
            where: {
                id: +id,
            },
        });
        return message_1.messageSuccess.CATEGORY_DELETE_SUCCESS;
    }
    async editCategory(id, data) {
        await this.prismaService.category.update({
            where: {
                id: +id,
            },
            data: {
                name: data.name,
                brand: {
                    connect: {
                        id: +data.brandId,
                    },
                },
            },
        });
        return message_1.messageSuccess.CATEGORY_UPDATE;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map