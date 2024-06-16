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
import { BrandService } from './brand.service';
import { JwtGuard } from 'src/auth/gauad';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addBrandDTO } from './dto/addBrand.dto';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @UseGuards(JwtGuard)
  @Get('all')
  async getAll(@Query() { page, limit }: PaginationDto) {
    return await this.brandService.findAll(+page, +limit);
  }
  @UseGuards(JwtGuard)
  @Post('/add-brand')
  async addUser(
    @Body() data: addBrandDTO,
  ): Promise<{ message: MessageDto; brand: addBrandDTO }> {
    return await this.brandService.addBrand(data);
  }
  @UseGuards(JwtGuard)
  @Delete('/delete-brand/:id')
  async deleteBrand(@Param('id') id: number) {
    return { data: await this.brandService.deleteBrand(id) };
  }
}
