import { PrismaService } from 'src/prisma/prisma.service';
import { addAddressDTO, editAddressDTO } from './dto';
export declare class AddressService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    addAddress(data: addAddressDTO): Promise<{
        id: number;
        userId: number;
        shipName: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteAddress(id: number): Promise<{
        id: number;
        userId: number;
        shipName: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editAddress(data: editAddressDTO): Promise<{
        id: number;
        userId: number;
        shipName: string;
        province: string;
        district: string;
        ward: string;
        address: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
