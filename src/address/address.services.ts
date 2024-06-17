import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addAddressDTO } from './dto';
@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}
  async addAddress(data: addAddressDTO) {
    return await this.prismaService.addressUser.create({
      data: {
        userId: +data.userId,
        shipAdress: data.shipAdress,
        shipEmail: data.shipEmail,
        shipName: data.shipName,
        shipPhone: data.shipPhone,
      },
    });
  }
}
