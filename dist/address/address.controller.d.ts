import { AddressService } from './address.services';
import { addAddressDTO, editAddressDTO } from './dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
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
