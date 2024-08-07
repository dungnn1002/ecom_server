/// <reference types="multer" />
import { PrismaService } from '../prisma/prisma.service';
import { AddressUser, User } from '@prisma/client';
import { MessageDto, ResponseDto } from 'src/share/dto';
import { addOrderDTO, addUserDTO, editProfileDTO, editUserDTO } from './dto';
import { UploadService } from 'src/upload/upload.service';
export declare class UserServices {
    private readonly prismaService;
    private readonly uploadService;
    private readonly logger;
    constructor(prismaService: PrismaService, uploadService: UploadService);
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
            id: number;
            email: string;
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
    getShipAddress(userId: number): Promise<AddressUser[]>;
    editProfile(userId: number, data: editProfileDTO, image: Express.Multer.File): Promise<{
        message: string;
        code: string;
    }>;
    addOrder(data: addOrderDTO): Promise<{
        message: string;
        code: string;
    }>;
    getOrderByUser(userId: number): Promise<({
        OrderDetaill: ({
            productSize: {
                product: {
                    name: string;
                    discountPrice: number;
                    ProductImage: {
                        image_url: string;
                    }[];
                };
                size: import(".prisma/client").$Enums.Size;
            };
        } & {
            id: number;
            orderId: number;
            productSizeId: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
    } & {
        id: number;
        addressUserId: number;
        isPaymentOnline: number;
        totalPrice: number;
        createdAt: Date;
        updatedAt: Date;
        typeShipId: number;
        voucherId: number;
    })[]>;
    getVoucherUsedByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        voucherId: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
