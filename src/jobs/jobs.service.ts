import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class JobsService {
  constructor(
    private prisma: PrismaService,
    private storageService: StorageService,
  ) {}

  async findAll(query: { search?: string; category?: string; target?: string }) {
    const where: any = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { company: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.target) {
      where.target = query.target;
    }

    return this.prisma.job.findMany({
      where,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        company: true,
        category: true,
        target: true,
        location: true,
        salary_range: true,
        created_at: true,
      },
    });
  }

  async findById(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException('Lowongan pekerjaan tidak ditemukan');
    }

    return job;
  }

  async apply(jobId: string, userId: string, file: Express.Multer.File, coverLetter?: string) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) {
      throw new NotFoundException('Lowongan pekerjaan tidak ditemukan');
    }

    // Upload CV file ke Supabase Storage
    const cvUrl = await this.storageService.uploadFile(file, 'cv');

    // Simpan data aplikasi ke database
    const application = await this.prisma.jobApplication.create({
      data: {
        job_id: jobId,
        user_id: userId,
        cv_url: cvUrl,
        cover_letter: coverLetter,
        status: 'pending',
      },
    });

    return application;
  }
}
