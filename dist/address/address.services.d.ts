import { PrismaService } from 'src/prisma/prisma.service';
import { addAddressDTO } from './dto';
export declare class AddressService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    addAddress(data: addAddressDTO): Promise<{
        id: number;
        userId: number;
        shipName: string;
        shipAddress: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAddress(id: number): Promise<{
        id: number;
        userId: number;
        shipName: string;
        shipAddress: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
