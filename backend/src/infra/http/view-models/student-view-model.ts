import { Host } from "@application/entities/host";

export class StudentViewModel {
    static toHTTP(student: Host) {
        return {
            id: student.id,
            name: student.name,
            email: student.email,
            semester: student.semester,
            course: student.course,
            idHost: student.idHost
        }
    }
}