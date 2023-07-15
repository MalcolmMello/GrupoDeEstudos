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
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import createMeetingResponse from "../responses/CreateMeetingResponse";
import { OptionalParams } from "../dtos/OptionalSearchParams";

@ApiTags('meetings')
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
  @ApiOperation({ summary: "Create meeting" })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 412,
    description: "Student not found.",
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: createMeetingResponse
    }
  })
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
  @ApiOperation({ summary: "Update a meeting." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not found | Student not found.",
  })
  @ApiResponse({
    status: 201,
    schema: {
      type: 'object',
      properties: createMeetingResponse
    }
  })
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
  @ApiOperation({ summary: "Cancel meeting." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not found",
  })
  @ApiResponse({
    status: 200,
    description: "Meeting successfully canceled."
  })
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
  @ApiOperation({ summary: "Show open meetings." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not found | No open meetings found.",
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meetings: {
          type: 'array',
          items: createMeetingResponse.meeting
        }
      }
    }
  })
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
  @ApiOperation({ summary: "Show all meetings from a specific host." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found | No meetings found.",
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meetings: {
          type: 'array',
          items: createMeetingResponse.meeting
        }
      }
    }
  })
  @Get('host')
  async host(
    @Request() req,
    @Query() {subject, description, semester, date_hour}: OptionalParams
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
  @ApiOperation({ summary: "Show all meetings within specified params." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found | No meetings found.",
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meetings: {
          type: 'array',
          items: createMeetingResponse.meeting
        }
      }
    }
  })
  @Get('search')
  async search(
    @Query() {subject, description, semester, date_hour}: OptionalParams
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
  @ApiOperation({ summary: "Confirm presence in a meeting." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 412,
    description: "You are the meeting host already! | Meeting doesn't exist or you already confirmed your presence.",
  })
  @ApiResponse({
    status: 201,
    description: "Presence successfully confirmed!",
  })
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
  @ApiOperation({ summary: "Cancel presence in a meeting." })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 412,
    description: "You are the meeting host! | Meeting doesn't exist or you already cancel your presence.",
  })
  @ApiResponse({
    status: 201,
    description: "Presence successfully canceled!",
  })
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
  @ApiOperation({ summary: "Show all scheduled meetings of a specified student" })
  @ApiResponse({
    status: 403,
    description: "Forbidden resource",
  })
  @ApiResponse({
    status: 404,
    description: "Not Found | No meetings found.",
  })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        meetings: {
          type: 'array',
          items: createMeetingResponse.meeting
        }
      }
    }
  })
  @Get('scheduled')
  async scheduled(
    @Request() req,
    @Query() {subject, description, semester, date_hour}: OptionalParams
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