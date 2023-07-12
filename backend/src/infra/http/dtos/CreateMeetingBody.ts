import { IsDateString, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator"

export class CreateMeetingBody {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  subject: string

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