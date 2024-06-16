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
exports.ShopCartController = void 0;
const addShopCart_dto_1 = require("./dto/addShopCart.dto");
const common_1 = require("@nestjs/common");
const gauad_1 = require("../auth/gauad");
const dto_1 = require("../share/dto");
const shopcart_service_1 = require("./shopcart.service");
let ShopCartController = class ShopCartController {
    constructor(shopCartService) {
        this.shopCartService = shopCartService;
    }
    async getAll({ page, limit }) {
        return await this.shopCartService.findAll(+page, +limit);
    }
    async addShopCart(data) {
        return await this.shopCartService.addShopCart(data);
    }
    async deleteShopCart(id) {
        return { data: await this.shopCartService.deleteShopCart(id) };
    }
    async updateShopCart(id, quantity) {
        return await this.shopCartService.updateShopCart(id, +quantity);
    }
};
exports.ShopCartController = ShopCartController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], ShopCartController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-shopcart'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addShopCart_dto_1.addShopCartDTO]),
    __metadata("design:returntype", Promise)
], ShopCartController.prototype, "addShopCart", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Delete)('/delete-shopcart/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShopCartController.prototype, "deleteShopCart", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/update-shopcart/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('quantity')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ShopCartController.prototype, "updateShopCart", null);
exports.ShopCartController = ShopCartController = __decorate([
    (0, common_1.Controller)('shopCart'),
    __metadata("design:paramtypes", [shopcart_service_1.ShopCartService])
], ShopCartController);
//# sourceMappingURL=shopcart.controller.js.map