import { OrderService } from './order.service';
import { PaginationDto } from 'src/share/dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAll({ page, limit }: PaginationDto): Promise<({
        addressUser: {
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
        } & {
            id: number;
            userId: number;
            shipName: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            shipPhone: string;
            shipEmail: string;
            createdAt: Date;
            updatedAt: Date;
        };
        TypeShip: {
            id: number;
            name: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        };
        Voucher: {
            id: number;
            fromDate: Date;
            toDate: Date;
            typeVoucherId: number;
            amount: number;
            codeVoucher: string;
            createdAt: Date;
            updatedAt: Date;
        };
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
    getOrderById(id: number): Promise<{
        addressUser: {
            id: number;
            userId: number;
            shipName: string;
            province: string;
            district: string;
            ward: string;
            address: string;
            shipPhone: string;
            shipEmail: string;
            createdAt: Date;
            updatedAt: Date;
        };
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
        TypeShip: {
            id: number;
            name: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        };
        Voucher: {
            id: number;
            fromDate: Date;
            toDate: Date;
            typeVoucherId: number;
            amount: number;
            codeVoucher: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        addressUserId: number;
        isPaymentOnline: number;
        totalPrice: number;
        createdAt: Date;
        updatedAt: Date;
        typeShipId: number;
        voucherId: number;
    }>;
}
