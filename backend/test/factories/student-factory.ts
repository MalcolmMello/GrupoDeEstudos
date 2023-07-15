import { makeCourse } from "./course-factory";
import { Host } from "@application/entities/host";

export function makeStudent() {
    const course = makeCourse();
    return new Host({
        name: 'Aluno', 
        email: 'Aluno@gmail.com', 
        password: 'senha123',
        semester: 3,
        course
    })
}