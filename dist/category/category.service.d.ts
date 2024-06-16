import { PrismaService } from 'src/prisma/prisma.service';
import { addCategoryDTO } from './dto/addCategory.dto';
import { MessageDto } from 'src/share/dto';
import { Category } from 'prisma/prisma-client';
import { editCategoryDTO } from './dto/editCategory.dto';
export declare class CategoryService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getCondition(brandId: number, name: string): {};
    findAll(page: number, limit: number, brandId: number, name: string): Promise<{
        data: ({
            brand: {
                name: string;
            };
        } & {
            id: number;
            name: string;
            brandId: number;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    addCateogry(data: addCategoryDTO): Promise<{
        message: MessageDto;
        category: Category;
    }>;
    deleteCategory(id: number): Promise<{
        message: string;
        code: string;
    }>;
    editCategory(id: number, data: editCategoryDTO): Promise<{
        message: string;
        code: string;
    }>;
}
