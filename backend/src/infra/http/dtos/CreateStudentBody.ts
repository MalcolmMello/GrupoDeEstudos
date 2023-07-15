import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsStrongPassword, IsUUID, Max, Min } from "class-validator"

export class CreateStudentBody {
    @IsNotEmpty()
    @ApiProperty({
        description: "The student name",
        example: "John Doe"
    })
    name: string

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: "The student email",
        example: "johndoe@gmail.com",
        format: "johndoe@gmail.com",
    })
    email: string

    @IsNotEmpty()
    @IsStrongPassword({minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1})
    @ApiProperty({
        description: "The student password, min length: 8, at least 1 lowercase, 1 uppercase and 1 symbol",
        example: "20wB&U4p"
    })
    password: string

    @IsNotEmpty()
    @Min(1)
    @Max(6)
    @ApiProperty({
        description: "The student semester",
        example: 3,
        minimum: 1,
        maximum: 6
    })
    semester: number

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        description: "Id to identify student course",
        example: "55b3a778-5ca8-4ac6-a6c1-586b7c5ece25",
        enum: [
            "55b3a778-5ca8-4ac6-a6c1-586b7c5ece25",
            "9f2165a8-2976-4fec-a2d9-ba00fe88915f",
            "997525aa-e6aa-4bf4-866e-6450369799c2",
            "ea791d2b-5798-434e-b21d-50317fefa627",
            "7ed037d1-8d54-455e-b382-a45edc9306f9",
            "2f7d0375-a89e-4213-b9b5-c650130ffd03",
            "ec0bb49c-a3b6-4495-b8c0-1a4cfb5a7c3c",
            "3053b5b7-4371-43ec-8b6b-c8f5ae222912",
        ]
    })
    idCourse: string
}