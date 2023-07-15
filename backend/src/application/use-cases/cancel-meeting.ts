import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";

interface CancelMeetingResponse {
  message: string | Error
}

interface CancelMeetingRequest {
  idMeeting: string,
  idHost: string
}

@Injectable()
export class CancelMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository
  ) {}

  async execute(request: CancelMeetingRequest): Promise<CancelMeetingResponse> {
    const { idMeeting, idHost } = request;

    const cancelMeeting = await this.meetingsRepository.cancelMeeting(idMeeting, idHost);

    return {
      message: "Meeting successfully canceled."
    }
  }
}