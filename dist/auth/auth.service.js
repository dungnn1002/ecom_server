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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const message_1 = require("../share/message");
const user_services_1 = require("../user/user.services");
let AuthService = class AuthService {
    constructor(prismaService, jwtService, configService, userServices) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.userServices = userServices;
    }
    async register(registerDTO) {
        const hashedPassword = await argon.hash(registerDTO.password);
        const isExist = await this.userServices.checkUserExist({
            email: registerDTO.email,
            phoneNumber: registerDTO.phoneNumber,
        });
        if (isExist)
            throw new common_1.HttpException(isExist, common_1.HttpStatus.BAD_REQUEST);
        const user = await this.prismaService.user.create({
            data: {
                email: registerDTO.email,
                password: hashedPassword,
                firstName: registerDTO.firstName,
                lastName: registerDTO.lastName,
                phoneNumber: registerDTO.phoneNumber,
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });
        return { message: message_1.messageSuccess.USER_REGISTER, user };
    }
    async login(LoginDTO) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: LoginDTO.email,
            },
        });
        if (!user) {
            throw new Error('User not found.');
        }
        const passwordMatch = await argon.verify(user.password, LoginDTO.password);
        if (!passwordMatch) {
            throw new Error('Password not match.');
        }
        delete user.password;
        const { accessToken, refreshToken } = await this.signJwtToken(user.id, user.email, user.roleId);
        return { user, accessToken, refreshToken };
    }
    async signJwtToken(userId, email, roleId) {
        const payload = { id: userId, email, roleId };
        const accessToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '365d',
            secret: this.configService.get('JWT_REFRESH_SECRET'),
        });
        return { accessToken, refreshToken };
    }
    async getMe(userId) {
        const user = await this.userServices.getUserInfoById(userId);
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        user_services_1.UserServices])
], AuthService);
//# sourceMappingURL=auth.service.js.map