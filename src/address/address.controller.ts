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
import { AddressService } from './address.services';
import { addAddressDTO, editAddressDTO } from './dto';
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @UseGuards(JwtGuard)
  @Post('/add')
  async addAddress(@Body() data: addAddressDTO) {
    return await this.addressService.addAddress(data);
  }
  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  async deleteAddress(@Param('id') id: number) {
    return await this.addressService.deleteAddress(id);
  }

  @UseGuards(JwtGuard)
  @Post('/edit')
  async editAddress(@Body() data: editAddressDTO) {
    return await this.addressService.editAddress(data);
  }
}
