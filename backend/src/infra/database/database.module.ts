import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { StudentsRepository } from "@application/repositories/students-repository";
import { CourseRepository } from "@application/repositories/course-repository";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";
import { PrismaCourseRepository } from "./prisma/repositories/prisma-course-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: StudentsRepository,
            useClass: PrismaStudentsRepository
        },
        {
            provide: CourseRepository,
            useClass: PrismaCourseRepository
        }
    ],
    exports: [
        StudentsRepository,
        CourseRepository
    ]
})
export class DatabaseModule {}