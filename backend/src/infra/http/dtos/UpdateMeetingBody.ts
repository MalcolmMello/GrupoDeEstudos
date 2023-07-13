import { IsDateString, IsNotEmpty, IsNumber, IsUUID, MaxLength, MinLength } from "class-validator"

export class UpdateMeetingBody {
  @IsNotEmpty()
  @IsUUID()
  idMeeting: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  subject: string

  @MinLength(1)
  @MaxLength(100)
  status: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(350)
  description: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  place: string

  @IsNotEmpty()
  @IsNumber()
  num_persons: number
  
  @IsNotEmpty()
  @IsDateString()
  date_hour: string
}