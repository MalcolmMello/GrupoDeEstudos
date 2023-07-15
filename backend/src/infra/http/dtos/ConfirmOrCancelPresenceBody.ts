import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsUUID } from "class-validator"

export class ConfirmOrCancelPresenceBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "Meeting id that the student wants to confirm your presence",
    example: "eff16578-54fa-4486-a7b5-a8ee34ec66ed"
  })
  idMeeting: string
}