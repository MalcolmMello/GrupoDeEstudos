import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { StudentsController } from "./controllers/students.controller";
import { CreateStudent } from "@application/use-cases/create-student";
import { MeetingsController } from "./controllers/meetings.controller";
import { CreateMeeting } from "@application/use-cases/create-meeting";
import { CancelMeeting } from "@application/use-cases/cancel-meeting";
import { GetOpenMeetings } from "@application/use-cases/get-open-meetings";

@Module({
    imports: [DatabaseModule],
    controllers: [StudentsController, MeetingsController],
    providers: [
        CreateStudent,
        CreateMeeting,
        CancelMeeting,
        GetOpenMeetings
    ]
})
export class HttpModule{}