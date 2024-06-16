import { BrandService } from './brand.service';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addBrandDTO } from './dto/addBrand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    getAll({ page, limit }: PaginationDto): Promise<{
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
    addUser(data: addBrandDTO): Promise<{
        message: MessageDto;
        brand: addBrandDTO;
    }>;
    deleteBrand(id: number): Promise<{
        data: {
            message: string;
            code: string;
        };
    }>;
}
