import { Student } from "@application/entities/student";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
    constructor(
        private prisma: PrismaService
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

        if(!student) {
            return null;
        }

        const course = await this.prisma.curso.findUnique({
            include: {
                unidade: true
            },
            where: {
                idCurso: student.cursoId
            }
        });

        if(!course) {
            return null;
        }

        return PrismaStudentMapper.toDomain(student, course);
    }
    
}