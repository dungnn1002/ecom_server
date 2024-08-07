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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const gauad_1 = require("../auth/gauad");
const user_services_1 = require("./user.services");
const dto_1 = require("../share/dto");
const dto_2 = require("./dto");
const decorators_1 = require("../share/decorators");
const platform_express_1 = require("@nestjs/platform-express");
let UserController = class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    async getAll({ page, limit }, phoneNumber) {
        return await this.userServices.getAll(+page, +limit, phoneNumber);
    }
    async addUser(data) {
        return { data: await this.userServices.addUser(data) };
    }
    async getShopCart(userId) {
        return await this.userServices.getShopCart(userId);
    }
    async getShipAddress(userId) {
        return await this.userServices.getShipAddress(userId);
    }
    async editUser(id, data) {
        return { data: await this.userServices.editUser(id, data) };
    }
    async deleteUser(id) {
        return { data: await this.userServices.deleteUser(id) };
    }
    async editProfile(userId, data, image) {
        return await this.userServices.editProfile(userId, data, image);
    }
    async addOrder(data) {
        return await this.userServices.addOrder(data);
    }
    async getOrderByUser(userId) {
        return await this.userServices.getOrderByUser(userId);
    }
    async getVoucherUsedByUserId(userId) {
        return await this.userServices.getVoucherUsedByUserId(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)('phoneNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.addUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('shopcart'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getShopCart", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('ship-address'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getShipAddress", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/edit-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_2.editUserDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Delete)('/delete-user/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/edit-profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('image')),
    __param(0, (0, decorators_1.GetUser)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'image',
    })
        .build({
        exceptionFactory: (errors) => {
            throw new common_1.BadRequestException({
                success: false,
                message: errors,
                data: null,
            });
        },
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_2.editProfileDTO, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-order'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.addOrderDTO]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addOrder", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('/order-by-user'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getOrderByUser", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('VoucherUsedByUserId'),
    __param(0, (0, decorators_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getVoucherUsedByUserId", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_services_1.UserServices])
], UserController);
//# sourceMappingURL=user.controller.js.map