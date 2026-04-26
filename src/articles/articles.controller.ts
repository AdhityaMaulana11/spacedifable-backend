import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    return this.articlesService.findAll({ search, category });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }
}
