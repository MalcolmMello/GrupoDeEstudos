import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, MaxLength, MinLength } from "class-validator"

export class CreateMeetingBody {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "What will be studied within this meeting",
    examples: ["mathematic", "programming"],
    minLength: 1,
    maxLength: 100
  })
  subject: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(350)
  @ApiProperty({
    description: "Description of what will be studied within this meeting",
    examples: ["We're going to study algebra", "We're going to study data structures"],
    minLength: 1,
    maxLength: 350
  })
  description: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  @ApiProperty({
    description: "Where the meeting will happen",
    examples: ["Franco da Rocha Mall", "Park next to highway"],
    minLength: 1,
    maxLength: 200
  })
  place: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "How many people confirmed presence previously",
    example: 8,
  })
  num_persons: number
  
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: "When the meeting will happen",
    example: "2023-08-25 14:00:00",
    format: "yyyy-mm-dd hh:ss:mm"
  })
  date_hour: string
}