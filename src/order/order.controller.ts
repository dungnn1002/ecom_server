import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/gauad';
import { OrderService } from './order.service';
import { PaginationDto } from 'src/share/dto';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.orderService.getAll(+page, +limit);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    return await this.orderService.getOrderById(id);
  }
}
