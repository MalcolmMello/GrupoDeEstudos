import { Student } from "@application/entities/student";
import { makeCourse } from "./course-factory";

export function makeStudent() {
    const course = makeCourse();
    return new Student({
        name: 'Aluno', 
        email: 'Aluno@gmail.com', 
        password: 'senha123',
        semester: 3,
        course
    })
}