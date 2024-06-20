import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { voucherService } from './voucher.service';
import { JwtGuard } from 'src/auth/gauad';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addTypeVoucherDTO } from './dto/addTypeVoucher.dto';
import { TypeVoucher, Voucher } from 'prisma/prisma-client';
import { addCodeVoucherDTO } from './dto/addCodeVoucher.dto';
@Controller('voucher')
export class voucherController {
  constructor(private readonly voucherService: voucherService) {}
  @Get('all-typeVoucher')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.voucherService.findAll(+page, +limit);
  }
  @UseGuards(JwtGuard)
  @Post('/add-typeVoucher')
  async addTypeVoucher(
    @Body() data: addTypeVoucherDTO,
  ): Promise<{ message: MessageDto; typeVoucher: TypeVoucher }> {
    return await this.voucherService.addTypeVoucher(data);
  }

  @Get('all-voucher')
  async getAllCodeVoucher(@Query() { page, limit }: PaginationDto) {
    return await this.voucherService.findAllCodeVoucher(+page, +limit);
  }

  @UseGuards(JwtGuard)
  @Post('/add-codeVoucher')
  async addCodeVoucher(
    @Body() data: addCodeVoucherDTO,
  ): Promise<{ message: MessageDto; codeVoucher: Voucher }> {
    return await this.voucherService.addCodeVoucher(data);
  }
  @UseGuards(JwtGuard)
  @Post('/add-voucherUsed')
  async addVoucherUsed(@Body() data: { userId: number; voucherId: number }) {
    return await this.voucherService.addVoucherUsed(data);
  }
}
