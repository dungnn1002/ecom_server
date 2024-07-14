/// <reference types="multer" />
import { UserServices } from './user.services';
import { PaginationDto, ResponseDto } from 'src/share/dto';
import { addUserDTO, editUserDTO, editProfileDTO, addOrderDTO } from './dto';
import { User, AddressUser } from '@prisma/client';
export declare class UserController {
    private readonly userServices;
    constructor(userServices: UserServices);
    getAll({ page, limit }: PaginationDto, phoneNumber: string): Promise<ResponseDto<Omit<User, 'password'>[]>>;
    addUser(data: addUserDTO): Promise<{
        data: {
            message: {
                message: string;
                code: string;
            };
            user: {
                email: string;
                id: number;
                createdAt: Date;
            };
        };
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
    editUser(id: number, data: editUserDTO): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
    deleteUser(id: number): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
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
}
