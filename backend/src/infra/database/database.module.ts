import { Module } from "@nestjs/common";
import { StudentsRepository } from "@application/repositories/students-repository";
import { CourseRepository } from "@application/repositories/course-repository";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaStudentsRepository } from "./prisma/repositories/prisma-students-repository";
import { PrismaCourseRepository } from "./prisma/repositories/prisma-course-repository";
import { PrismaMeetingsRepository } from "./prisma/repositories/prisma-meetings-repository";

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
        },
        {
            provide: MeetingsRepository,
            useClass: PrismaMeetingsRepository
        }
    ],
    exports: [
        StudentsRepository,
        CourseRepository,
        MeetingsRepository
    ]
})
export class DatabaseModule {}