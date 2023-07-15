import { IsNotEmpty, IsUUID } from "class-validator"

export class ConfirmOrCancelPresenceBody {
  @IsNotEmpty()
  @IsUUID()
  idMeeting: string
}