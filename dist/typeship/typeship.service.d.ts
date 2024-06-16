import { PrismaService } from 'src/prisma/prisma.service';
import { MessageDto } from 'src/share/dto';
import { TypeShip } from 'prisma/prisma-client';
import { addTypeShipDTO } from './dto/addTypeShip.dto';
export declare class TypeShipService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(page: number, limit: number): Promise<{
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
    addTypeShip(data: addTypeShipDTO): Promise<{
        message: MessageDto;
        typeShip: TypeShip;
    }>;
}
