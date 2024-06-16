import { addShopCartDTO } from './dto/addShopCart.dto';
import { PaginationDto } from 'src/share/dto';
import { ShopCartService } from './shopcart.service';
import { ShopCart } from 'prisma/prisma-client';
export declare class ShopCartController {
    private readonly shopCartService;
    constructor(shopCartService: ShopCartService);
    getAll({ page, limit }: PaginationDto): Promise<{
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
        data: {
            id: number;
            userId: number;
            productSizeId: number;
            quantity: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateShopCart(id: number, quantity: number): Promise<ShopCart>;
}
