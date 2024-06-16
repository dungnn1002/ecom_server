import { PrismaService } from 'src/prisma/prisma.service';
import { addTypeVoucherDTO } from './dto/addTypeVoucher.dto';
import { MessageDto } from 'src/share/dto';
import { TypeVoucher, Voucher } from 'prisma/prisma-client';
import { addCodeVoucherDTO } from './dto/addCodeVoucher.dto';
export declare class voucherService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(page: number, limit: number): Promise<{
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
    findAllCodeVoucher(page: number, limit: number): Promise<{
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
    addVoucherUsed(data: {
        userId: number;
        voucherId: number;
    }): Promise<{
        id: number;
        userId: number;
        voucherId: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
