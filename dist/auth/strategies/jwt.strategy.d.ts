import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    prismaService: PrismaService;
    constructor(configService: ConfigService, prismaService: PrismaService);
    validate(payload: {
        id: number;
        email: string;
    }): Promise<{
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
        isActiveEmail: boolean;
        roleId: import(".prisma/client").$Enums.Role;
        status: import(".prisma/client").$Enums.Status;
        userToken: string;
        createdAt: Date;
        updatedAt: Date;
    } | {
        message: string;
    }>;
}
export {};
