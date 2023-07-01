import { Student } from "@application/entities/student";

export abstract class StudentsRepository {
    abstract create(student: Student): Promise<void>;
    abstract findByEmail(email: string): Promise<Student | null>
}