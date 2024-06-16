import { addShopCartDTO } from './dto/addShopCart.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ShopCart } from 'prisma/prisma-client';
export declare class ShopCartService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(page: number, limit: number): Promise<{
        data: {
            id: number;
            userId: number;
            productSizeId: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            totalPage: number;
        };
    }>;
    addShopCart(data: addShopCartDTO): Promise<ShopCart>;
    deleteShopCart(id: number): Promise<{
        id: number;
        userId: number;
        productSizeId: number;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateShopCart(id: number, quantity: number): Promise<ShopCart>;
}
