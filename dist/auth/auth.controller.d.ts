import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: RegisterDTO): Promise<{
        message: {
            message: string;
            code: string;
        };
        user: {
            email: string;
            id: number;
            createdAt: Date;
        };
    }>;
    login(body: LoginDTO): Promise<{
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
    getMe(userId: number): Promise<{
        data: {
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
    }>;
}
