import { CreateStudent } from "@application/use-cases/create-student";
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { CreateStudentBody } from "../dtos/CreateStudentBody";
import { StudentViewModel } from "../view-models/student-view-model";
import { LocalAuthGuard } from "@infra/auth/local-auth.guard";
import { AuthenticatedGuard } from "@infra/auth/authenticated.guard";

@Controller('students')
export class StudentsController {
    constructor(
        private createStudent: CreateStudent
    ) {}
    
    @Post('create')
    async create(@Body() body: CreateStudentBody) {
        const { name, email, password, semester, idCourse } = body;

        const semesterToNumber = Number(semester);

        try {
            const { student } = await this.createStudent.execute({
                name,
                email,
                password,
                semester: semesterToNumber,
                idCourse
            });
    
            return { student: StudentViewModel.toHTTP(student) };   
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error.message,
              }, HttpStatus.FORBIDDEN, {
                cause: error
              });
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req): Promise<any> {
        return { msg: "Logged in!" };
    }


    @UseGuards(AuthenticatedGuard)
    @Get('protected')
    async getHello(@Request() req): Promise<any> {
        return { student: StudentViewModel.toHTTP(req.user) };
    }
}