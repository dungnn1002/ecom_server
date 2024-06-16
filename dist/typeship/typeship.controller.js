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
exports.TypeShipController = void 0;
const common_1 = require("@nestjs/common");
const typeship_service_1 = require("./typeship.service");
const gauad_1 = require("../auth/gauad");
const dto_1 = require("../share/dto");
const addTypeShip_dto_1 = require("./dto/addTypeShip.dto");
let TypeShipController = class TypeShipController {
    constructor(typeShipService) {
        this.typeShipService = typeShipService;
    }
    async getAll({ page, limit }) {
        return await this.typeShipService.findAll(+page, +limit);
    }
    async addUser(data) {
        return await this.typeShipService.addTypeShip(data);
    }
};
exports.TypeShipController = TypeShipController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], TypeShipController.prototype, "getAll", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add-typeship'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [addTypeShip_dto_1.addTypeShipDTO]),
    __metadata("design:returntype", Promise)
], TypeShipController.prototype, "addUser", null);
exports.TypeShipController = TypeShipController = __decorate([
    (0, common_1.Controller)('typeship'),
    __metadata("design:paramtypes", [typeship_service_1.TypeShipService])
], TypeShipController);
//# sourceMappingURL=typeship.controller.js.map