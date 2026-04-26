import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: { search?: string; category?: string; target?: string }) {
    const where: any = {};

    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.category) {
      where.category = query.category;
    }

    if (query.target) {
      where.target = query.target;
    }

    const courses = await this.prisma.course.findMany({
      where,
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        target: true,
        thumbnail_url: true,
        instructor: true,
        duration: true,
        created_at: true,
      },
    });

    return courses;
  }

  async findById(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        target: true,
        thumbnail_url: true,
        instructor: true,
        duration: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    return course;
  }

  async findLearn(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        materials: {
          orderBy: { order: 'asc' },
          select: {
            id: true,
            title: true,
            content: true,
            content_type: true,
            order: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course tidak ditemukan');
    }

    const { password: _, ...result } = course as any;
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      category: course.category,
      target: course.target,
      thumbnail_url: course.thumbnail_url,
      instructor: course.instructor,
      duration: course.duration,
      materials: course.materials,
    };
  }
}
