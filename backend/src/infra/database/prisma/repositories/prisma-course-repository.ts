import { Course } from "@application/entities/course";
import { CourseRepository } from "@application/repositories/course-repository";
import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { PrismaCourseMapper } from "../mappers/prisma-course-mapper";

@Injectable()
export class PrismaCourseRepository implements CourseRepository {
    constructor(private prisma: PrismaService) {}
    async create(course: Course): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<Course | null> {
        const course = await this.prisma.curso.findUnique({
            include: {
                unidade: true
            },
            where: {
                idCurso: id
            }
        });

        if(!course) {
            return null;
        }

        return PrismaCourseMapper.toDomain(course);
    }
    
}