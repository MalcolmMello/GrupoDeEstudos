import { IS_NUMBER, IsNotEmpty, IsStrongPassword, IsUUID, Max, Min } from "class-validator"

export class CreateStudentBody {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1})
    password: string

    @IsNotEmpty()
    @Min(1)
    @Max(6)
    semester: number

    @IsNotEmpty()
    @IsUUID()
    idCourse: string
}