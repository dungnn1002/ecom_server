import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { httpErrors } from 'src/share/exception';
import { addTypeVoucherDTO } from './dto/addTypeVoucher.dto';
import { MessageDto } from 'src/share/dto';
import { Discount, TypeVoucher, Voucher } from 'prisma/prisma-client';
import { addCodeVoucherDTO } from './dto/addCodeVoucher.dto';
@Injectable()
export class voucherService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);

    const typeVouchers = await this.prismaService.typeVoucher.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data: typeVouchers,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.typeVoucher.count()) / limit,
        ),
      },
    };
  }
  async addTypeVoucher(
    data: addTypeVoucherDTO,
  ): Promise<{ message: MessageDto; typeVoucher: TypeVoucher }> {
    const typeVoucher = await this.prismaService.typeVoucher.create({
      data: {
        typeVoucher: data.typeVoucher as Discount,
        value: data.value,
        minValue: data.minValue,
        maxValue: data.maxValue,
      },
    });

    return { message: httpErrors.VOUCHER_ADD_TYPE_SUCCESS, typeVoucher };
  }
  async findAllCodeVoucher(page: number, limit: number) {
    if (isNaN(page) || isNaN(limit))
      throw new HttpException(httpErrors.QUERY_INVALID, HttpStatus.BAD_REQUEST);

    const vouchers = await this.prismaService.voucher.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: {
        typeVoucher: true,
      },
    });

    return {
      data: vouchers,
      pagination: {
        totalPage: Math.ceil(
          (await this.prismaService.voucher.count()) / limit,
        ),
      },
    };
  }
  async addCodeVoucher(
    data: addCodeVoucherDTO,
  ): Promise<{ message: MessageDto; codeVoucher: Voucher }> {
    const codeVoucher = await this.prismaService.voucher.create({
      data: {
        codeVoucher: data.codeVoucher,
        amount: +data.amount,
        typeVoucherId: +data.typeVoucherId,
        fromDate: data.fromDate ? new Date(data.fromDate) : null,
        toDate: data.toDate ? new Date(data.toDate) : null,
      },
    });

    return { message: httpErrors.VOUCHER_ADD_CODE_SUCCESS, codeVoucher };
  }

  async addVoucherUsed(data: { userId: number; voucherId: number }) {
    const voucherUsed = await this.prismaService.voucherUsed.create({
      data: {
        userId: +data.userId,
        voucherId: +data.voucherId,
      },
    });
    return voucherUsed;
  }
}
