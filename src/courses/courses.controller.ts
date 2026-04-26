import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('target') target?: string,
  ) {
    return this.coursesService.findAll({ search, category, target });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.coursesService.findById(id);
  }

  @Get(':id/learn')
  async findLearn(@Param('id') id: string) {
    return this.coursesService.findLearn(id);
  }
}
