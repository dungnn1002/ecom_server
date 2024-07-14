import { User } from 'prisma/prisma-client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserServices } from 'src/user/user.services';
export declare class AuthService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly configService;
    private readonly userServices;
    constructor(prismaService: PrismaService, jwtService: JwtService, configService: ConfigService, userServices: UserServices);
    register(registerDTO: RegisterDTO): Promise<{
        message: {
            message: string;
            code: string;
        };
        user: {
            id: number;
            email: string;
            createdAt: Date;
        };
    }>;
    login(LoginDTO: LoginDTO): Promise<{
        user: {
            id: number;
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            address: string;
            gender: import(".prisma/client").$Enums.Gender;
            phoneNumber: string;
            image: string;
            dob: Date;
            roleId: import(".prisma/client").$Enums.Role;
            status: import(".prisma/client").$Enums.Status;
            createdAt: Date;
            updatedAt: Date;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    signJwtToken(userId: number, email: string, roleId?: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    getMe(userId: number): Promise<User>;
}
