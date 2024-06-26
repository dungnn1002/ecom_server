/// <reference types="multer" />
import { ProductService } from './product.service';
import { addProductDTO, editProductDTO } from './dto';
import { MessageDto, PaginationDto } from 'src/share/dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    addProduct(data: addProductDTO, images: Express.Multer.File[]): Promise<{
        message: MessageDto;
    }>;
    getAllProduct({ page, limit }: PaginationDto): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
            };
            brand: {
                id: number;
                name: string;
            };
            ProductSize: {
                id: number;
                productId: number;
                size: import(".prisma/client").$Enums.Size;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            ProductImage: {
                id: number;
                productId: number;
                image_url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            contentHTML: string;
            contentMarkdown: string;
            status: import(".prisma/client").$Enums.Status;
            categoryId: number;
            material: string;
            brandId: number;
            originalPrice: number;
            discountPrice: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    getAllProductByFilter({ page, limit, brandId, categoryId, name, sort, order }: any): Promise<{
        data: ({
            category: {
                id: number;
                name: string;
            };
            brand: {
                id: number;
                name: string;
            };
            ProductSize: {
                id: number;
                productId: number;
                size: import(".prisma/client").$Enums.Size;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            ProductImage: {
                id: number;
                productId: number;
                image_url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            contentHTML: string;
            contentMarkdown: string;
            status: import(".prisma/client").$Enums.Status;
            categoryId: number;
            material: string;
            brandId: number;
            originalPrice: number;
            discountPrice: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    getTopProduct(): Promise<({
        product: {
            ProductImage: {
                id: number;
                productId: number;
                image_url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            contentHTML: string;
            contentMarkdown: string;
            status: import(".prisma/client").$Enums.Status;
            categoryId: number;
            material: string;
            brandId: number;
            originalPrice: number;
            discountPrice: number;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        productId: number;
        size: import(".prisma/client").$Enums.Size;
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getProductById(id: number): Promise<{
        data: {
            category: {
                name: string;
            };
            brand: {
                name: string;
            };
            ProductSize: {
                id: number;
                productId: number;
                size: import(".prisma/client").$Enums.Size;
                quantity: number;
                createdAt: Date;
                updatedAt: Date;
            }[];
            ProductImage: {
                id: number;
                productId: number;
                image_url: string;
                createdAt: Date;
                updatedAt: Date;
            }[];
        } & {
            id: number;
            name: string;
            contentHTML: string;
            contentMarkdown: string;
            status: import(".prisma/client").$Enums.Status;
            categoryId: number;
            material: string;
            brandId: number;
            originalPrice: number;
            discountPrice: number;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    editProduct(id: number, data: editProductDTO, images: Express.Multer.File[]): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
    deleteCategory(id: number): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
}
