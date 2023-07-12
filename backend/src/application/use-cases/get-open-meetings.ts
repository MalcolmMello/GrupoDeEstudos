import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";
import { OpenMeetingsNotFound } from "./errors/open-meetings-not-found";
import { Meeting } from "@application/entities/meeting";

interface GetOpenMeetingsResponse {
  meetings: Meeting[]
}

@Injectable()
export class GetOpenMeetings {
  constructor(
    private meetingsRepository: MeetingsRepository
  ) {}

  async execute(): Promise<GetOpenMeetingsResponse> {
    const meetings = await this.meetingsRepository.getMeetings();

    if(!meetings) {
      throw new OpenMeetingsNotFound();
    }

    return {
      meetings
    };
  }
}