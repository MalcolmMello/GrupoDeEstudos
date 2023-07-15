import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";

interface CancelPresenceResponse {
  message: string | Error
}

interface CancelPresenceRequest {
  idStudent: string, 
  idMeeting: string,
  idHost: string
}

@Injectable()
export class CancelPresence {
  constructor(
    private meetingsRepository: MeetingsRepository
  ){}

  async execute(request: CancelPresenceRequest): Promise<CancelPresenceResponse> {
    const { idStudent, idMeeting, idHost} = request;

    const cancelPresence = await this.meetingsRepository.cancelPresence(idMeeting, idStudent, idHost);

    return {
      message: "Presence successfully canceled!"
    };
  }
}