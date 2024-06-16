import { PrismaService } from 'src/prisma/prisma.service';
import { addBrandDTO } from './dto/addBrand.dto';
import { MessageDto } from 'src/share/dto';
import { Brand } from '@prisma/client';
export declare class BrandService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(page: number, limit: number): Promise<{
        data: {
            id: number;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            totalPage: number;
        };
    }>;
    addBrand(data: addBrandDTO): Promise<{
        message: MessageDto;
        brand: Brand;
    }>;
    deleteBrand(id: number): Promise<{
        message: string;
        code: string;
    }>;
}
