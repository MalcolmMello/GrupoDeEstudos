import { Body, Controller, Post, UseGuards, Request, Patch, Get, NotFoundException, HttpException, HttpStatus, Query, Put } from "@nestjs/common";
import { CreateMeeting } from "@application/use-cases/create-meeting";
import { CreateMeetingBody } from "../dtos/CreateMeetingBody";
import { AuthenticatedGuard } from "@infra/auth/authenticated.guard";
import { StudentViewModel } from "../view-models/student-view-model";
import { MeetingViewModel } from "../view-models/meeting-view-model";
import { CancelMeetingBody } from "../dtos/CancelMeetingBody";
import { CancelMeeting } from "@application/use-cases/cancel-meeting";
import { GetOpenMeetings } from "@application/use-cases/get-open-meetings";
import { SearchMeeting } from "@application/use-cases/search-meetings";
import { UpdateMeetingBody } from "../dtos/UpdateMeetingBody";
import { UpdateMeeting } from "@application/use-cases/update-meeting";
import { ConfirmPresence } from "@application/use-cases/confirm-presence";
import { ConfirmOrCancelPresenceBody } from "../dtos/ConfirmOrCancelPresenceBody";
import { ScheduledMeetings } from "@application/use-cases/scheduled-meetings";
import { CancelPresence } from "@application/use-cases/cancel-presence";
import { GetHostMeetings } from "@application/use-cases/get-host-meetings";

@Controller('meetings')
export class MeetingsController {
  constructor(
    private createMeeting: CreateMeeting,
    private cancelMeeting: CancelMeeting,
    private getOpenMeetings: GetOpenMeetings,
    private searchMeetings: SearchMeeting,
    private updateMeeting: UpdateMeeting,
    private confirmPresence: ConfirmPresence,
    private cancelPresence: CancelPresence,
    private scheduledMeetings: ScheduledMeetings,
    private hostMeetings: GetHostMeetings
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
  @Put('update')
  async update(@Body() body: UpdateMeetingBody, @Request() req) {
    const { idMeeting, description, status, place, subject, num_persons, date_hour } = body;

    const { idHost } = StudentViewModel.toHTTP(req.user);

    const numPersonsToNumber = Number(num_persons);

    const StringDateHourToDate = new Date(date_hour);
    
    try {
      const { meeting } = await this.updateMeeting.execute({
        idMeeting,
        status,
        subject,
        description,
        place,
        num_persons: numPersonsToNumber,
        idHost,
        date_hour: StringDateHourToDate
      });
  
      return { meeting: MeetingViewModel.toHTTP(meeting) };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
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
  @Get('open')
  async open() {
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

  @UseGuards(AuthenticatedGuard)
  @Get('host')
  async host(
    @Request() req,
    @Query('subject') subject: string | undefined, 
    @Query('description') description: string | undefined, 
    @Query('date_hour') date_hour: string | undefined,
    @Query('semester') semester: string | undefined
  ) {
    try {
      let dateHourStringToDate: Date | undefined;
      let semesterToNumber: number | undefined;

      if(date_hour) { dateHourStringToDate = new Date(date_hour); }

      if(semester) { semesterToNumber = Number(semester); }

      const { idHost } = StudentViewModel.toHTTP(req.user);
      
      const { meetings } = await this.hostMeetings.execute({ 
        idHost,
        subject, 
        description, 
        date_hour: dateHourStringToDate, 
        semester: semesterToNumber 
      });

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

  @UseGuards(AuthenticatedGuard)
  @Get('search')
  async search(
    @Query('subject') subject: string | undefined, 
    @Query('description') description: string | undefined, 
    @Query('date_hour') date_hour: string | undefined,
    @Query('semester') semester: string | undefined
  ) {
    try {
      let dateHourStringToDate: Date | undefined;
      let semesterToNumber: number | undefined;

      if(date_hour) { dateHourStringToDate = new Date(date_hour); }

      if(semester) { semesterToNumber = Number(semester); }
    
      const { meetings } = await this.searchMeetings.execute({ subject, description, date_hour: dateHourStringToDate, semester: semesterToNumber });
    
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

  @UseGuards(AuthenticatedGuard)
  @Post('confirm-presence')
  async presenceConfirmed(@Body() body: ConfirmOrCancelPresenceBody, @Request() req) {
    const { idMeeting } = body;

    const { id, idHost } = StudentViewModel.toHTTP(req.user);

    try {
      const { message } = await this.confirmPresence.execute({idMeeting, idStudent: id, idHost});

      return {
        message
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: error.message,
      }, HttpStatus.PRECONDITION_FAILED, {
        cause: error
      });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Post('cancel-presence')
  async presenceCanceled(@Body() body: ConfirmOrCancelPresenceBody, @Request() req) {
    const { idMeeting } = body;

    const { id, idHost } = StudentViewModel.toHTTP(req.user);

    try {
      const { message } = await this.cancelPresence.execute({idMeeting, idStudent: id, idHost});

      return {
        message
      };
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.PRECONDITION_FAILED,
        error: error.message,
      }, HttpStatus.PRECONDITION_FAILED, {
        cause: error
      });
    }
  }

  @UseGuards(AuthenticatedGuard)
  @Get('scheduled')
  async scheduled(
    @Request() req,
    @Query('subject') subject: string | undefined, 
    @Query('description') description: string | undefined, 
    @Query('date_hour') date_hour: string | undefined,
    @Query('semester') semester: string | undefined
  ) {
    const { id } = StudentViewModel.toHTTP(req.user);
    let dateHourStringToDate: Date | undefined;
    let semesterToNumber: number | undefined;

    if(date_hour) { dateHourStringToDate = new Date(date_hour); }

    if(semester) { semesterToNumber = Number(semester); }

    try {
      const { meetings } = await this.scheduledMeetings.execute({ 
        idStudent: id, 
        subject, 
        description, 
        date_hour: dateHourStringToDate, 
        semester: semesterToNumber 
      });

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