import { Meeting } from "@application/entities/meeting";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";
import { NoMeetingsFound } from "./errors/no-meetings-found";

interface GetHostMeetingsRequest {
  idHost: string,
  semester?: number,
  subject?: string,
  description?: string,
  date_hour?: Date
}

interface GetHostMeetingsResponse {
  meetings: Meeting[]
}

@Injectable()
export class GetHostMeetings {
  constructor(
    private meetingsRepository: MeetingsRepository
  ) {}

  async execute(request: GetHostMeetingsRequest): Promise<GetHostMeetingsResponse> {
    const { idHost, subject, description, semester, date_hour } = request;

    const meetings = await this.meetingsRepository.hostMeetings(idHost, subject, description, semester, date_hour);

    if(!meetings) {
      throw new NoMeetingsFound();
    }

    return {
      meetings
    };
  }
}