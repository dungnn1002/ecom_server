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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const gauad_1 = require("../auth/gauad");
const address_services_1 = require("./address.services");
const dto_1 = require("./dto");
let AddressController = class AddressController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async addAddress(data) {
        return await this.addressService.addAddress(data);
    }
    async deleteAddress(id) {
        return await this.addressService.deleteAddress(id);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.addAddressDTO]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "addAddress", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AddressController.prototype, "deleteAddress", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.Controller)('address'),
    __metadata("design:paramtypes", [address_services_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map