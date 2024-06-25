import { addShopCartDTO } from './dto/addShopCart.dto';
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
import { PaginationDto } from 'src/share/dto';
import { ShopCartService } from './shopcart.service';
import { ShopCart } from 'prisma/prisma-client';
@Controller('shopCart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {}
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.shopCartService.findAll(+page, +limit);
  }
  @UseGuards(JwtGuard)
  @Post('/add-shopcart')
  async addShopCart(@Body() data: addShopCartDTO): Promise<ShopCart> {
    return await this.shopCartService.addShopCart(data);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-shopcart/:id')
  async deleteShopCart(@Param('id') id: number) {
    return { data: await this.shopCartService.deleteShopCart(id) };
  }

  @UseGuards(JwtGuard)
  @Post('/update-shopcart/:id')
  async updateShopCart(
    @Param('id') id: number,
    @Body('quantity') quantity: number,
  ): Promise<ShopCart> {
    return await this.shopCartService.updateShopCart(id, +quantity);
  }
}
