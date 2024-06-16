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
exports.voucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const exception_1 = require("../share/exception");
let voucherService = class voucherService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findAll(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const typeVouchers = await this.prismaService.typeVoucher.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data: typeVouchers,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.typeVoucher.count()) / limit),
            },
        };
    }
    async addTypeVoucher(data) {
        const typeVoucher = await this.prismaService.typeVoucher.create({
            data: {
                typeVoucher: data.typeVoucher,
                value: data.value,
                minValue: data.minValue,
                maxValue: data.maxValue,
            },
        });
        return { message: exception_1.httpErrors.VOUCHER_ADD_TYPE_SUCCESS, typeVoucher };
    }
    async findAllCodeVoucher(page, limit) {
        if (isNaN(page) || isNaN(limit))
            throw new common_1.HttpException(exception_1.httpErrors.QUERY_INVALID, common_1.HttpStatus.BAD_REQUEST);
        const vouchers = await this.prismaService.voucher.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: {
                typeVoucher: true,
            },
        });
        return {
            data: vouchers,
            pagination: {
                totalPage: Math.ceil((await this.prismaService.voucher.count()) / limit),
            },
        };
    }
    async addCodeVoucher(data) {
        const codeVoucher = await this.prismaService.voucher.create({
            data: {
                codeVoucher: data.codeVoucher,
                amount: +data.amount,
                typeVoucherId: +data.typeVoucherId,
                fromDate: data.fromDate ? new Date(data.fromDate) : null,
                toDate: data.toDate ? new Date(data.toDate) : null,
            },
        });
        return { message: exception_1.httpErrors.VOUCHER_ADD_CODE_SUCCESS, codeVoucher };
    }
};
exports.voucherService = voucherService;
exports.voucherService = voucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], voucherService);
//# sourceMappingURL=voucher.service.js.map