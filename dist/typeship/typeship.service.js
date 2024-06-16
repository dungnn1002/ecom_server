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
exports.TypeShipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
let TypeShipService = class TypeShipService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const typeships = await this.prismaService.typeShip.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: typeships,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.typeShip.count()) / limit),
            },
        };
    }
    async addTypeShip(data) {
        const existName = await this.prismaService.typeShip.findUnique({
            where: {
                name: data.name,
            },
        });
        if (existName)
            throw new common_1.HttpException(exception_1.httpErrors.BRAND_EXIST, common_1.HttpStatus.BAD_REQUEST);
        const typeShip = await this.prismaService.typeShip.create({
            data: {
                name: data.name,
                price: data.price,
            },
        });
        return { message: exception_1.httpErrors.TYPE_SHIP_ADD_SUCCESS, typeShip };
    }
};
exports.TypeShipService = TypeShipService;
exports.TypeShipService = TypeShipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TypeShipService);
//# sourceMappingURL=typeship.service.js.map