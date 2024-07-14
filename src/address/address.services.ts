import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { addAddressDTO, editAddressDTO } from './dto';
@Injectable()
export class AddressService {
  constructor(private readonly prismaService: PrismaService) {}
  async addAddress(data: addAddressDTO) {
    return await this.prismaService.addressUser.create({
      data: {
        userId: +data.userId,
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
        shipEmail: data.shipEmail,
        shipName: data.shipName,
        shipPhone: data.shipPhone,
      },
    });
  }
  async deleteAddress(id: number) {
    return await this.prismaService.addressUser.delete({
      where: {
        id: +id,
      },
    });
  }
  async editAddress(data: editAddressDTO) {
    return await this.prismaService.addressUser.update({
      where: {
        id: +data.id,
      },
      data: {
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
        shipEmail: data.shipEmail,
        shipName: data.shipName,
        shipPhone: data.shipPhone,
      },
    });
  }
}
