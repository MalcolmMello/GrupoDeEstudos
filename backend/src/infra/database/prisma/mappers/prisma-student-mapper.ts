import { Course } from "@application/entities/course";
import { Student } from "@application/entities/student";
import { Unit } from "@application/entities/unit";
import { Aluno as RawStudent, Curso as RawCourse, Unidade as RawUnidade} from "@prisma/client";

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

    static toDomain(rawStudent: RawStudent, rawCourse: RawCourseAndRawUnidade) {
        const unit = new Unit(rawCourse.unidade.nome, rawCourse.unidade.idUnidade);
        const course = new Course(rawCourse.nome, unit, rawCourse.idCurso);
        
        return new Student({
            name: rawStudent.nome,
            email: rawStudent.email,
            password: '',
            semester: rawStudent.semestre,
            course: course
        });
    }
}