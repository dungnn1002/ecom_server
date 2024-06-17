import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/gauad';
import { UserServices } from './user.services';
import { PaginationDto, ResponseDto } from 'src/share/dto';
import { addUserDTO, editUserDTO } from './dto';
import { User, AddressUser } from '@prisma/client';
import { GetUser } from 'src/share/decorators';
@Controller('users')
export class UserController {
  constructor(private readonly userServices: UserServices) {}

  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(
    @Query() { page, limit }: PaginationDto,
    @Query('phoneNumber') phoneNumber: string,
  ): Promise<ResponseDto<Omit<User, 'password'>[]>> {
    return await this.userServices.getAll(+page, +limit, phoneNumber);
  }

  @UseGuards(JwtGuard)
  @Post('/add-user')
  async addUser(@Body() data: addUserDTO) {
    return { data: await this.userServices.addUser(data) };
  }
  @UseGuards(JwtGuard)
  @Get('shopcart')
  async getShopCart(@GetUser() userId: number) {
    return await this.userServices.getShopCart(userId);
  }

  @UseGuards(JwtGuard)
  @Get('ship-address')
  async getShipAddress(@GetUser() userId: number): Promise<AddressUser[]> {
    return await this.userServices.getShipAddress(userId);
  }

  @UseGuards(JwtGuard)
  @Post('/edit-user/:id')
  async editUser(@Param('id') id: number, @Body() data: editUserDTO) {
    return { data: await this.userServices.editUser(id, data) };
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-user/:id')
  async deleteUser(@Param('id') id: number) {
    return { data: await this.userServices.deleteUser(id) };
  }
}
