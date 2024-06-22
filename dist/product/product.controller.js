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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const dto_1 = require("./dto");
const gauad_1 = require("../auth/gauad");
const dto_2 = require("../share/dto");
const platform_express_1 = require("@nestjs/platform-express");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async addProduct(data, images) {
        return await this.productService.addProduct(data, images);
    }
    async getAllProduct({ page, limit }) {
        return await this.productService.findAllProduct(+page, +limit);
    }
    async getAllProductByFilter({ page, limit, brandId, categoryId, name, sort, order }) {
        return await this.productService.findAllProductByFilter(+page, +limit, +brandId, +categoryId, name, sort, order);
    }
    async getUserById(id) {
        return { data: await this.productService.getProductById(+id) };
    }
    async editCategory(id, data, images) {
        return { data: await this.productService.editProduct(id, data, images) };
    }
    async deleteCategory(id) {
        return { data: await this.productService.deleteProduct(id) };
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('add-product'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'image',
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 5,
        message: 'Dung lượng file không được vượt quá 5MB',
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
    __metadata("design:paramtypes", [dto_1.addProductDTO, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "addProduct", null);
__decorate([
    (0, common_1.Get)('all-product'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_2.PaginationDto]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProduct", null);
__decorate([
    (0, common_1.Get)('all-product-filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProductByFilter", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getUserById", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('edit-product/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
        .addFileTypeValidator({
        fileType: 'image',
    })
        .addMaxSizeValidator({
        maxSize: 1024 * 1024 * 5,
        message: 'Dung lượng file không được vượt quá 5MB',
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
    __metadata("design:paramtypes", [Number, dto_1.editProductDTO, Array]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "editCategory", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Delete)('/delete-product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "deleteCategory", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map