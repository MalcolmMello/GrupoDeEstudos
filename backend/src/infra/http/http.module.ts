import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { StudentsController } from "./controllers/students.controller";
import { CreateStudent } from "@application/use-cases/create-student";

@Module({
    imports: [DatabaseModule],
    controllers: [StudentsController],
    providers: [
        CreateStudent
    ]
})
export class HttpModule{}