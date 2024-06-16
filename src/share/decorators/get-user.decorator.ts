import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { httpErrors } from '../exception';
import { EnvConstant } from '../constants/env.constant';
require('dotenv').config();

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    try {
      let token = req.headers.authorization;
      if (token.startsWith('Bearer ')) token = token.slice(7);
      const secretKey = process.env[EnvConstant.JWT_ACCESS_SECRET];
      return new JwtService().verify(token, { secret: secretKey }).id;
    } catch (error) {
      throw new HttpException(
        httpErrors.TOKEN_INVALID,
        HttpStatus.UNAUTHORIZED,
      );
    }
  },
);
