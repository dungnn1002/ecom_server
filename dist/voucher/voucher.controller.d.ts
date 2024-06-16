import { voucherService } from './voucher.service';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addTypeVoucherDTO } from './dto/addTypeVoucher.dto';
import { TypeVoucher, Voucher } from 'prisma/prisma-client';
import { addCodeVoucherDTO } from './dto/addCodeVoucher.dto';
export declare class voucherController {
    private readonly voucherService;
    constructor(voucherService: voucherService);
    getAll({ page, limit }: PaginationDto): Promise<{
        data: {
            id: number;
            typeVoucher: import(".prisma/client").$Enums.Discount;
            value: number;
            maxValue: number;
            minValue: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
        pagination: {
            totalPage: number;
        };
    }>;
    addTypeVoucher(data: addTypeVoucherDTO): Promise<{
        message: MessageDto;
        typeVoucher: TypeVoucher;
    }>;
    getAllCodeVoucher({ page, limit }: PaginationDto): Promise<{
        data: ({
            typeVoucher: {
                id: number;
                typeVoucher: import(".prisma/client").$Enums.Discount;
                value: number;
                maxValue: number;
                minValue: number;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
            id: number;
            fromDate: Date;
            toDate: Date;
            typeVoucherId: number;
            amount: number;
            codeVoucher: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        pagination: {
            totalPage: number;
        };
    }>;
    addCodeVoucher(data: addCodeVoucherDTO): Promise<{
        message: MessageDto;
        codeVoucher: Voucher;
    }>;
}
