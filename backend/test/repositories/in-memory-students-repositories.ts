import { Host } from "@application/entities/host";
import { Student } from "@application/entities/student";
import { StudentsRepository } from "@application/repositories/students-repository";

export class InMemoryStudentsRepository implements StudentsRepository {

    public students: Host[] = [];

    async create(student: Host): Promise<void> {
        this.students.push(student);
    }   

    async findByEmail(email: string): Promise<Host | null> {
        const student = this.students.find((item) => item.email === email);

        return student;
    }

    async findByHostId(id: string): Promise<Host> {
        const student = this.students.find((item) => item.idHost === id);

        return student;
    }

    async findById(id: string): Promise<Host> {
        const student = this.students.find((item) => item.id === id);

        return student;
    }
}