import { TypeShipService } from './typeship.service';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { TypeShip } from 'prisma/prisma-client';
import { addTypeShipDTO } from './dto/addTypeShip.dto';
export declare class TypeShipController {
    private readonly typeShipService;
    constructor(typeShipService: TypeShipService);
    getAll({ page, limit }: PaginationDto): Promise<{
        data: {
            id: number;
            name: string;
            price: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            totalPage: number;
        };
    }>;
    addUser(data: addTypeShipDTO): Promise<{
        message: MessageDto;
        typeShip: TypeShip;
    }>;
}
