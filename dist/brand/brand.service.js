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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
const message_1 = require("../share/message");
let BrandService = class BrandService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const brands = await this.prismaService.brand.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: brands,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.brand.count()) / limit),
            },
        };
    }
    async addBrand(data) {
        const existName = await this.prismaService.brand.findUnique({
            where: {
                name: data.name,
            },
        });
        if (existName)
            throw new common_1.HttpException(exception_1.httpErrors.BRAND_EXIST, common_1.HttpStatus.BAD_REQUEST);
        const brand = await this.prismaService.brand.create({
            data: {
                name: data.name,
            },
        });
        return { message: exception_1.httpErrors.BRAND_ADD_SUCCESS, brand };
    }
    async deleteBrand(id) {
        await this.prismaService.brand.delete({
            where: {
                id: +id,
            },
        });
        return message_1.messageSuccess.BRAND_DELETE_SUCCESS;
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BrandService);
//# sourceMappingURL=brand.service.js.map