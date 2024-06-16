"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeshipModule = void 0;
const common_1 = require("@nestjs/common");
const typeship_controller_1 = require("./typeship.controller");
const typeship_service_1 = require("./typeship.service");
let TypeshipModule = class TypeshipModule {
};
exports.TypeshipModule = TypeshipModule;
exports.TypeshipModule = TypeshipModule = __decorate([
    (0, common_1.Module)({
        controllers: [typeship_controller_1.TypeShipController],
        providers: [typeship_service_1.TypeShipService],
        exports: [typeship_service_1.TypeShipService],
    })
], TypeshipModule);
//# sourceMappingURL=typeship.module.js.map