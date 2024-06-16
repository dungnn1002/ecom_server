import { CategoryService } from './category.service';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addCategoryDTO } from './dto/addCategory.dto';
import { Category } from 'prisma/prisma-client';
import { editCategoryDTO } from './dto/editCategory.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getAll({ page, limit }: PaginationDto, brandId: number, name: string): Promise<{
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
    addUser(data: addCategoryDTO): Promise<{
        message: MessageDto;
        category: Category;
    }>;
    deleteCategory(id: number): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
    editCategory(id: number, data: editCategoryDTO): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
}
