import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";
import { NoMeetingsFound } from "./errors/no-meetings-found";
import { Meeting } from "@application/entities/meeting";

interface SearchMeetingRequest {
  semester?: number,
  subject?: string,
  description?: string,
  date_hour?: Date
}

interface SearchMeetingResponse {
  meetings: Meeting[]
}

@Injectable()
export class SearchMeeting {
  constructor(
    private meetingRepository: MeetingsRepository
  ) {}

  async execute(request: SearchMeetingRequest): Promise<SearchMeetingResponse> {
    const { subject, description, semester, date_hour } = request;
    
    const meetings = await this.meetingRepository.searchMeetings(subject, description, semester, date_hour);

    if(!meetings) {
      throw new NoMeetingsFound();
    }

    return {
      meetings
    };
  }
}