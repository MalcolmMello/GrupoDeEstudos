import { Course } from "@application/entities/course";
import { Host } from "@application/entities/host";
import { Student } from "@application/entities/student";
import { Unit } from "@application/entities/unit";
import { Aluno as RawStudent, Curso as RawCourse, Unidade as RawUnidade, Organizador as RawOrganizador} from "@prisma/client";

interface RawStudentAndRawHost {
    cursoId: string,
    email: string,
    idAluno: string,
    nome: string,
    semestre: number,
    senha: string,
    organizador: RawOrganizador
}

interface RawCourseAndRawUnidade {
    idCurso: string,
    nome: string,
    unidade: RawUnidade
}

export class PrismaStudentMapper {
    static toPrisma(student: Student) {
        return {
            idAluno: student.id,
            nome: student.name,
            email: student.email,
            senha: student.password,
            semestre: student.semester,
            cursoId: student.course.id
        }
    }

    static toDomain(rawStudent: RawStudentAndRawHost, rawCourse: RawCourseAndRawUnidade) {
        const unit = new Unit(rawCourse.unidade.nome, rawCourse.unidade.idUnidade);
        const course = new Course(rawCourse.nome, unit, rawCourse.idCurso);
        
        return new Host({
            name: rawStudent.nome,
            email: rawStudent.email,
            password: rawStudent.senha,
            semester: rawStudent.semestre,
            course: course
        },
        rawStudent.organizador.idOrganizador,
        rawStudent.idAluno
        );
    }
}