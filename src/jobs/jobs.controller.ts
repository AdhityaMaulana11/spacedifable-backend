import { Controller, Get, Post, Param, Query, Body, UseGuards, UseInterceptors, UploadedFile, Request, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JobsService } from './jobs.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('target') target?: string,
  ) {
    return this.jobsService.findAll({ search, category, target });
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.jobsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/apply')
  @UseInterceptors(FileInterceptor('cv_file'))
  async apply(
    @Param('id') id: string,
    @Request() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body() body: ApplyJobDto,
  ) {
    if (!file) {
      throw new BadRequestException('File CV (cv_file) harus disertakan');
    }
    
    return this.jobsService.apply(id, req.user.id, file, body.cover_letter);
  }
}
