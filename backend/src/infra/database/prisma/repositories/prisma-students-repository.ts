import { Student } from "@application/entities/student";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaStudentMapper } from "../mappers/prisma-student-mapper";
import { Host } from "@application/entities/host";

@Injectable()
export class PrismaStudentsRepository implements StudentsRepository {
    constructor(
        private prisma: PrismaService
    ) {}
    
    async create(student: Host): Promise<void> {
        const raw = PrismaStudentMapper.toPrisma(student);
        
        const newAluno = await this.prisma.aluno.create({
            data: raw
        });

        const idOrganizador = student.idHost;

        await this.prisma.organizador.create({
            data: {
                alunoId: newAluno.idAluno,
                idOrganizador
            }
        });
    }

    async findByEmail(email: string): Promise<Host | null> {
        const student = await this.prisma.aluno.findUnique({
            where: {
                email: email
            },
            include: {
                organizador: true
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

    async findById(id: string): Promise<Host | null> {
        const student = await this.prisma.aluno.findUnique({
            where: {
                idAluno: id
            },
            include: {
                organizador: true
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