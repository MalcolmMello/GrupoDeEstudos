import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { StudentsController } from "./controllers/students.controller";
import { CreateStudent } from "@application/use-cases/create-student";
import { MeetingsController } from "./controllers/meetings.controller";
import { CreateMeeting } from "@application/use-cases/create-meeting";
import { CancelMeeting } from "@application/use-cases/cancel-meeting";
import { GetOpenMeetings } from "@application/use-cases/get-open-meetings";
import { CoursesController } from "./controllers/courses.controller";
import { GetCourses } from "@application/use-cases/get-courses";
import { SearchMeeting } from "@application/use-cases/search-meetings";
import { UpdateMeeting } from "@application/use-cases/update-meeting.";

@Module({
    imports: [DatabaseModule],
    controllers: [StudentsController, MeetingsController, CoursesController],
    providers: [
        CreateStudent,
        CreateMeeting,
        CancelMeeting,
        GetOpenMeetings,
        SearchMeeting,
        UpdateMeeting,
        GetCourses
    ]
})
export class HttpModule{}