import { CreateStudent } from "@application/use-cases/create-student";
import { Body, Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards, Response } from "@nestjs/common";
import { CreateStudentBody } from "../dtos/CreateStudentBody";
import { StudentViewModel } from "../view-models/student-view-model";
import { LocalAuthGuard } from "@infra/auth/local-auth.guard";
import { AuthenticatedGuard } from "@infra/auth/authenticated.guard";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import loginStudentBody from "../dtos/LoginStudentBody";
import createStudentResponse from "../responses/CreateStudentResponse";

@ApiTags('students')
@Controller('students')
export class StudentsController {
    constructor(
        private createStudent: CreateStudent
    ) {}
    
    @Post('create')
    @ApiOperation({ summary: "Create a student" })
    @ApiResponse({
        status: 201
    })
    @ApiResponse({
        status: 412,
        description: "Course not found. | Email is already registered.",
    })
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
                status: HttpStatus.PRECONDITION_FAILED,
                error: error.message,
              }, HttpStatus.PRECONDITION_FAILED, {
                cause: error
              });
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: "Login a student" })
    @ApiResponse({
        status: 401,
        description: "Unauthorized",
    })
    @ApiResponse({
        status: 201,
        schema: {
            type: 'object',
            properties: {
                msg: {
                    type: 'string',
                    example: 'Logged in!'
                }
            }
        }
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: loginStudentBody
        }
    })
    async login(@Request() req): Promise<any> {
        return { msg: "Logged in!" };
    }


    @UseGuards(AuthenticatedGuard)
    @Get('is-logged')
    @ApiOperation({ summary: "Check if a student is logged" })
    @ApiResponse({
        status: 403,
        description: "Forbidden resource",
    })
    @ApiResponse({
        status: 201,
        schema: {
            type: 'object',
            properties: createStudentResponse
        }
    })
    async getHello(@Request() req): Promise<any> {
        return { student: StudentViewModel.toHTTP(req.user) };
    }

    @Get('/logout')
    async logout(@Request() req, @Response() res) {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}