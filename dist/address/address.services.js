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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AddressService = class AddressService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async addAddress(data) {
        return await this.prismaService.addressUser.create({
            data: {
                userId: +data.userId,
                shipAddress: data.shipAddress,
                shipEmail: data.shipEmail,
                shipName: data.shipName,
                shipPhone: data.shipPhone,
            },
        });
    }
    async deleteAddress(id) {
        return await this.prismaService.addressUser.delete({
            where: {
                id: +id,
            },
        });
    }
    async editAddress(data) {
        return await this.prismaService.addressUser.update({
            where: {
                id: +data.id,
            },
            data: {
                shipAddress: data.shipAddress,
                shipEmail: data.shipEmail,
                shipName: data.shipName,
                shipPhone: data.shipPhone,
            },
        });
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AddressService);
//# sourceMappingURL=address.services.js.map