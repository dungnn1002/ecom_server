import { AddressService } from './address.services';
import { addAddressDTO } from './dto';
export declare class AddressController {
    private readonly addressService;
    constructor(addressService: AddressService);
    addAddress(data: addAddressDTO): Promise<{
        id: number;
        userId: number;
        shipName: string;
        shipAdress: string;
        shipPhone: string;
        shipEmail: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
