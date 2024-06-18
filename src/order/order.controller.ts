import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/gauad';
import { OrderService } from './order.service';
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  // @UseGuards(JwtGuard)
  // @Post('/add')
  // async addOrder(@Body() data) {
  //   return await this.orderService.addOrder(data);
  // }
}
