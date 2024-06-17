"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const brand_module_1 = require("./brand/brand.module");
const category_module_1 = require("./category/category.module");
const typeship_module_1 = require("./typeship/typeship.module");
const voucher_module_1 = require("./voucher/voucher.module");
const upload_module_1 = require("./upload/upload.module");
const product_module_1 = require("./product/product.module");
const shopcart_module_1 = require("./shopcart/shopcart.module");
const address_module_1 = require("./address/address.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            brand_module_1.BrandModule,
            category_module_1.CategoryModule,
            typeship_module_1.TypeshipModule,
            voucher_module_1.VoucherModule,
            upload_module_1.UploadModule,
            product_module_1.ProductModule,
            shopcart_module_1.ShopcartModule,
            address_module_1.AddressModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map