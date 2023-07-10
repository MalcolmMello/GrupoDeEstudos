import { IsNotEmpty, IsUUID } from "class-validator"

export class CancelMeetingBody {

  @IsNotEmpty()
  @IsUUID()
  idMeeting: string
}