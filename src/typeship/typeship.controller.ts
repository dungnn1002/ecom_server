import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { TypeShipService } from './typeship.service';
import { JwtGuard } from 'src/auth/gauad';
import { MessageDto, PaginationDto } from 'src/share/dto';
// import { addCategoryDTO } from './dto/addCategory.dto';
import { TypeShip } from 'prisma/prisma-client';
import { addTypeShipDTO } from './dto/addTypeShip.dto';
@Controller('typeship')
export class TypeShipController {
  constructor(private readonly typeShipService: TypeShipService) {}
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.typeShipService.findAll(+page, +limit);
  }
  @UseGuards(JwtGuard)
  @Post('/add-typeship')
  async addUser(
    @Body() data: addTypeShipDTO,
  ): Promise<{ message: MessageDto; typeShip: TypeShip }> {
    return await this.typeShipService.addTypeShip(data);
  }
}
