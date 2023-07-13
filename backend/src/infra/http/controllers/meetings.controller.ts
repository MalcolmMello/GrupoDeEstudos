import { Body, Controller, Post, UseGuards, Request, Patch, Get, NotFoundException, HttpException, HttpStatus } from "@nestjs/common";
import { CreateMeeting } from "@application/use-cases/create-meeting";
import { CreateMeetingBody } from "../dtos/CreateMeetingBody";
import { AuthenticatedGuard } from "@infra/auth/authenticated.guard";
import { StudentViewModel } from "../view-models/student-view-model";
import { MeetingViewModel } from "../view-models/meeting-view-model";
import { CancelMeetingBody } from "../dtos/CancelMeetingBody";
import { CancelMeeting } from "@application/use-cases/cancel-meeting";
import { GetOpenMeetings } from "@application/use-cases/get-open-meetings";
import { GetCourses } from "@application/use-cases/get-courses";

@Controller('meetings')
export class MeetingsController {
  constructor(
    private createMeeting: CreateMeeting,
    private cancelMeeting: CancelMeeting,
    private getOpenMeetings: GetOpenMeetings,
    private getCourses: GetCourses
  ){}

  @UseGuards(AuthenticatedGuard)
  @Post('create')
  async create(@Body() body: CreateMeetingBody, @Request() req) {
    const { description, place, subject, num_persons, date_hour } = body;

    const { idHost } = StudentViewModel.toHTTP(req.user);

    const numPersonsToNumber = Number(num_persons);

    const StringDateHourToDate = new Date(date_hour);

    const { meeting } = await this.createMeeting.execute({
      subject,
      description,
      place,
      num_persons: numPersonsToNumber,
      idHost,
      date_hour: StringDateHourToDate
    });

    return { meeting: MeetingViewModel.toHTTP(meeting) };
  }

  @UseGuards(AuthenticatedGuard)
  @Patch('cancel')
  async cancel(@Body() body: CancelMeetingBody, @Request() req) {
    const { idMeeting } = body;

    const { idHost } = StudentViewModel.toHTTP(req.user);

    try {
      const { message } = await this.cancelMeeting.execute({
        idHost,
        idMeeting
      });

      return { message }
    } catch (error) {
      throw new NotFoundException();
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('open-meetings')
  async openMeetings() {
    try {
      const { meetings } = await this.getOpenMeetings.execute();

      return { meetings: meetings.map(MeetingViewModel.toHTTP) }
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
  }
}