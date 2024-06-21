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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const gauad_1 = require("../auth/gauad");
const comment_service_1 = require("./comment.service");
const platform_express_1 = require("@nestjs/platform-express");
const addComment_dto_1 = require("./dto/addComment.dto.");
const dto_1 = require("../share/dto");
let CommentController = class CommentController {
    constructor(addressService) {
        this.addressService = addressService;
    }
    async addComment(data, images) {
        return await this.addressService.addComment(data, images);
    }
    async getCommentByProduct(productId, { page, limit }) {
        return await this.addressService.getCommentByProduct(+productId, +page, +limit);
    }
    async getAll({ page, limit }) {
        return await this.addressService.getAll(+page, +limit);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Post)('/add'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)(new common_1.ParseFilePipeBuilder()
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
    __metadata("design:paramtypes", [addComment_dto_1.addCommentDTO, Array]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "addComment", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('product/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentByProduct", null);
__decorate([
    (0, common_1.UseGuards)(gauad_1.JwtGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.PaginationDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getAll", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map