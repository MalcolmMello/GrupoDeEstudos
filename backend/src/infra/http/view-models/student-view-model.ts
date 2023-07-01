import { Student } from "@application/entities/student";

export class StudentViewModel {
    static toHTTP(student: Student) {
        return {
            id: student.id,
            name: student.name,
            email: student.email,
            semester: student.semester,
            course: student.course.getname,
        }
    }
}