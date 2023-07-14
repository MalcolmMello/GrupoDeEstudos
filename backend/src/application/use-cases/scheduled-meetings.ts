import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";
import { NoMeetingsFound } from "./errors/no-meetings-found";
import { Meeting } from "@application/entities/meeting";

interface ScheduledMeetingsRequest {
  idStudent: string
  semester?: number,
  subject?: string,
  description?: string,
  date_hour?: Date
}

interface ScheduledMeetingsResponse {
  meetings: Meeting[]
}

@Injectable()
export class ScheduledMeetings {
  constructor(
    private meetingsRepository: MeetingsRepository
  ){}

  async execute(request: ScheduledMeetingsRequest): Promise<ScheduledMeetingsResponse> {
    const { idStudent, subject, description, semester, date_hour } = request;

    const meetings = await this.meetingsRepository.studentScheduledMeetings(idStudent, subject, description, semester, date_hour);

    if(!meetings) {
      throw new NoMeetingsFound();
    }

    return {
      meetings
    };
  }
}