import { CreateStudent } from "@application/use-cases/create-student";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateStudentBody } from "../dtos/CreateStudentBody";
import { StudentViewModel } from "../view-models/student-view-model";

@Controller('students')
export class StudentsController {
    constructor(
        private createStudent: CreateStudent
    ) {}
    
    @Post()
    async create(@Body() body: CreateStudentBody) {
        const { name, email, password, semester, idCourse } = body;

        const semesterToNumber = Number(semester);

        const { student } = await this.createStudent.execute({
            name,
            email,
            password,
            semester: semesterToNumber,
            idCourse
        });

        return { student: StudentViewModel.toHTTP(student) };
    }
}