import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { User } from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { messageSuccess } from 'src/share/message';
import { httpErrors } from 'src/share/exception';
import { UserServices } from 'src/user/user.services';
import { JwtGuard } from './gauad/myjwt.guard';
@Injectable({})
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userServices: UserServices,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const hashedPassword = await argon.hash(registerDTO.password);
    const isExist = await this.userServices.checkUserExist({
      email: registerDTO.email,
      phoneNumber: registerDTO.phoneNumber,
    });
    if (isExist) throw new HttpException(isExist, HttpStatus.BAD_REQUEST);
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
    return { message: messageSuccess.USER_REGISTER, user };
  }

  async login(LoginDTO: LoginDTO) {
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
    const { accessToken, refreshToken } = await this.signJwtToken(
      user.id,
      user.email,
      user.roleId,
    );
    return { user, accessToken, refreshToken };
  }
  async signJwtToken(
    userId: number,
    email: string,
    roleId?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
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

  async getMe(userId: number): Promise<User> {
    const user = await this.userServices.getUserInfoById(userId);
    return user;
  }
  
}
