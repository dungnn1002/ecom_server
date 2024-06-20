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
import { CategoryService } from './category.service';
import { JwtGuard } from 'src/auth/gauad';
import { MessageDto, PaginationDto } from 'src/share/dto';
import { addCategoryDTO } from './dto/addCategory.dto';
import { Category } from 'prisma/prisma-client';
import { editCategoryDTO } from './dto/editCategory.dto';
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('all')
  async getAll(
    @Query() { page, limit }: PaginationDto,
    @Query('brandId') brandId: number,
    @Query('name') name: string,
  ) {
    return await this.categoryService.findAll(+page, +limit, +brandId, name);
  }
  @UseGuards(JwtGuard)
  @Post('/add-category')
  async addUser(
    @Body() data: addCategoryDTO,
  ): Promise<{ message: MessageDto; category: Category }> {
    return await this.categoryService.addCateogry(data);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete-category/:id')
  async deleteCategory(@Param('id') id: number) {
    return { data: await this.categoryService.deleteCategory(id) };
  }

  @UseGuards(JwtGuard)
  @Post('/edit-category/:id')
  async editCategory(@Param('id') id: number, @Body() data: editCategoryDTO) {
    return { data: await this.categoryService.editCategory(id, data) };
  }
}
