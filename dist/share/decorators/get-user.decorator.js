"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const exception_1 = require("../exception");
const env_constant_1 = require("../constants/env.constant");
require('dotenv').config();
exports.GetUser = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    try {
        let token = req.headers.authorization;
        if (token.startsWith('Bearer '))
            token = token.slice(7);
        const secretKey = process.env[env_constant_1.EnvConstant.JWT_ACCESS_SECRET];
        return new jwt_1.JwtService().verify(token, { secret: secretKey }).id;
    }
    catch (error) {
        throw new common_1.HttpException(exception_1.httpErrors.TOKEN_INVALID, common_1.HttpStatus.UNAUTHORIZED);
    }
});
//# sourceMappingURL=get-user.decorator.js.map