/// <reference types="multer" />
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from 'src/share/dto';
import { UploadService } from '../upload/upload.service';
import { editProductDTO, addProductDTO } from './dto';
export declare class ProductService {
    private readonly prismaService;
    private readonly uploadService;
    private readonly logger;
    constructor(prismaService: PrismaService, uploadService: UploadService);
    addProduct(data: addProductDTO, images: Express.Multer.File[]): Promise<{
        message: MessageDto;
    }>;
    findAllProduct(page: number, limit: number): Promise<{
        data: ({
            category: {
                name: string;
                id: number;
            };
            brand: {
                name: string;
                id: number;
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
            view: number;
            material: string;
            brandId: number;
            originalPrice: number;
            discountPrice: number;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    findById(id: number): Promise<{
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
        view: number;
        material: string;
        brandId: number;
        originalPrice: number;
        discountPrice: number;
    }>;
    getProductById(id: number): Promise<{
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
        view: number;
        material: string;
        brandId: number;
        originalPrice: number;
        discountPrice: number;
    }>;
    editProduct(id: number, data: editProductDTO, images: Express.Multer.File[]): Promise<{
        message: string;
        code: string;
    }>;
    deleteProduct(id: number): Promise<{
        message: string;
        code: string;
    }>;
}
