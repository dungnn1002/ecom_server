"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopcartModule = void 0;
const common_1 = require("@nestjs/common");
const shopcart_service_1 = require("./shopcart.service");
const shopcart_controller_1 = require("./shopcart.controller");
let ShopcartModule = class ShopcartModule {
};
exports.ShopcartModule = ShopcartModule;
exports.ShopcartModule = ShopcartModule = __decorate([
    (0, common_1.Module)({
        controllers: [shopcart_controller_1.ShopCartController],
        providers: [shopcart_service_1.ShopCartService],
        exports: [shopcart_service_1.ShopCartService],
    })
], ShopcartModule);
//# sourceMappingURL=shopcart.module.js.map