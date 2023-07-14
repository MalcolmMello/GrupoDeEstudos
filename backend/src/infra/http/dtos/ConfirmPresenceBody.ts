import { IsNotEmpty, IsUUID } from "class-validator"

export class ConfirmPresenceBody {
  @IsNotEmpty()
  @IsUUID()
  idMeeting: string
}