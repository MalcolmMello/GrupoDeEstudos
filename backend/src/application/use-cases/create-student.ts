import { CourseRepository } from "@application/repositories/course-repository";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { CourseNotFound } from "./errors/course-not-found";
import { EmailAlreadyExists } from "./errors/email-already-exists";
import { Host } from "@application/entities/host";

interface CreateStudentRequest {
    name: string,
    email: string,
    password: string,
    semester: number,
    idCourse: string
}

interface CreateStudentResponse {
    student: Host
}

@Injectable()
export class CreateStudent {
    constructor(
        private studentsRepository: StudentsRepository,
        private coursesRepository: CourseRepository
    ) {}

    async execute(request: CreateStudentRequest): Promise<CreateStudentResponse> {
        const {name, email, password, semester, idCourse} = request;

        const course = await this.coursesRepository.findById(idCourse);
        
        if(!course) {
            throw new CourseNotFound();
        }

        const studentAlreadyExist = await this.studentsRepository.findByEmail(email);

        if(studentAlreadyExist) {
            throw new EmailAlreadyExists();
        }

        const student = new Host({name, email, password, semester, course});

        await this.studentsRepository.create(student);

        return {
            student
        };
    }
}