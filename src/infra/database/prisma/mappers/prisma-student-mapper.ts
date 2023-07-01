import { Course } from "@application/entities/course";
import { Student } from "@application/entities/student";
import { Aluno as RawStudent, Curso as RawCourse} from "@prisma/client";

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

    static toDomain(rawStudent: RawStudent, rawCourse: RawCourse) {
        /*return new Student({
            name: rawStudent.nome,
            email: rawStudent.email,
            password: '',
            semester: rawStudent.semestre,
            course: 
        }) */
    }
}