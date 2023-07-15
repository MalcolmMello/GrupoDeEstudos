import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";

interface ConfirmPresenceResponse {
  message: string | Error
}

interface ConfirmPresenceRequest {
  idStudent: string, 
  idMeeting: string,
  idHost: string
}

@Injectable()
export class ConfirmPresence {
  constructor(
    private meetingsRepository: MeetingsRepository
  ){}

  async execute(request: ConfirmPresenceRequest): Promise<ConfirmPresenceResponse> {
    const { idStudent, idMeeting, idHost} = request;

    const confirmPresence = await this.meetingsRepository.confirmPresence(idMeeting, idStudent, idHost);

    return {
      message: "Presence successfully confirmed!"
    };
  }
}