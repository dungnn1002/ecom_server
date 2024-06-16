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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.voucherController = void 0;
const common_1 = require("@nestjs/common");
const voucher_service_1 = require("./voucher.service");
const gauad_1 = require("../auth/gauad");
const dto_1 = require("../share/dto");
const addTypeVoucher_dto_1 = require("./dto/addTypeVoucher.dto");
const addCodeVoucher_dto_1 = require("./dto/addCodeVoucher.dto");
let voucherController = class voucherController {
    constructor(voucherService) {
        this.voucherService = voucherService;
    }
    async getAll({ page, limit }) {
        return await this.voucherService.findAll(+page, +limit);
    }
    async addTypeVoucher(data) {
        return await this.voucherService.addTypeVoucher(data);
    }
    async getAllCodeVoucher({ page, limit }) {
        return await this.voucherService.findAllCodeVoucher(+page, +limit);
    }
    async addCodeVoucher(data) {
        return await this.voucherService.addCodeVoucher(data);
    }
};
exports.voucherController = voucherController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all-typeVoucher'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], voucherController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-typeVoucher'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addTypeVoucher_dto_1.addTypeVoucherDTO]),
    __metadata("design:returntype", Promise)
], voucherController.prototype, "addTypeVoucher", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all-voucher'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], voucherController.prototype, "getAllCodeVoucher", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-codeVoucher'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addCodeVoucher_dto_1.addCodeVoucherDTO]),
    __metadata("design:returntype", Promise)
], voucherController.prototype, "addCodeVoucher", null);
exports.voucherController = voucherController = __decorate([
    (0, common_1.Controller)('voucher'),
    __metadata("design:paramtypes", [voucher_service_1.voucherService])
], voucherController);
//# sourceMappingURL=voucher.controller.js.map