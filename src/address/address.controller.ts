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
import { addAddressDTO } from './dto';
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @UseGuards(JwtGuard)
  @Post('/add')
  async addAddress(@Body() data: addAddressDTO) {
    return await this.addressService.addAddress(data);
  }
}
