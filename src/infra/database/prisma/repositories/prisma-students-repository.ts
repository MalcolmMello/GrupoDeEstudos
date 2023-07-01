import { Student } from "@application/entities/student";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";
import { CourseRepository } from "@application/repositories/course-repository";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
    constructor(
        private prisma: PrismaService,
        private courseRepository: CourseRepository
    ) {}
    
    async create(student: Student): Promise<void> {
        const raw = PrismaStudentMapper.toPrisma(student);
        
        await this.prisma.aluno.create({
            data: raw
        });
    }

    async findByEmail(email: string): Promise<Student | null> {
        const student = await this.prisma.aluno.findUnique({
            where: {
                email: email
            }
        });

        const course = await this.courseRepository.findById(student.cursoId);

        if(!course) {
            return null;
        }

        if(!student) {
            return null;
        }
    }
    
}