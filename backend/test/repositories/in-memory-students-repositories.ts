import { Student } from "@application/entities/student";
import { StudentsRepository } from "@application/repositories/students-repository";

export class InMemoryStudentsRepository implements StudentsRepository {
    public students: Student[] = [];

    async create(student: Student): Promise<void> {
        this.students.push(student);
    }   

    async findByEmail(email: string): Promise<Student | null> {
        const student = this.students.find((item) => item.email === email)

        return student;
    }
}