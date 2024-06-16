import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { MessageDto, ResponseDto } from 'src/share/dto';
import { addUserDTO, editUserDTO } from './dto';
export declare class UserServices {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findById(userId: number): Promise<User | null>;
    getUserInfoById(userId: number): Promise<User | null>;
    getAll(page: number, limit: number, phoneNumber: string): Promise<ResponseDto<Omit<User, 'password'>[]>>;
    checkUserExist(data: {
        email?: string;
        phoneNumber?: string;
    }): Promise<MessageDto | false>;
    addUser(data: addUserDTO): Promise<{
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
    editUser(id: number, data: editUserDTO): Promise<{
        message: string;
        code: string;
    }>;
    deleteUser(id: number): Promise<{
        message: string;
        code: string;
    }>;
    getShopCart(userId: number): Promise<{
        data: {
            productSize: {
                productImage: string;
                product: {
                    name: string;
                    discountPrice: number;
                };
                id: number;
                productId: number;
                size: import(".prisma/client").$Enums.Size;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            };
            id: number;
            userId: number;
            productSizeId: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
