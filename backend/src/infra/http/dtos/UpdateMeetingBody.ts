import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber, IsUUID, MaxLength, MinLength } from "class-validator"

export class UpdateMeetingBody {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: "id of the meeting that will be updated",
    example: "54dd21a6-3c2b-4ecb-9aaa-3f1e1d784d2b",
  })
  idMeeting: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "What will be studied within this meeting",
    examples: ["mathematic", "programming"],
    minLength: 1,
    maxLength: 100,
    required: false
  })
  subject: string

  @MinLength(1)
  @MaxLength(100)
  @ApiProperty({
    description: "Meeting status, when created is opened by default",
    examples: ["Em aberto", "Concluída", "Cancelada"],
    enum: ["Em aberto", "Concluída", "Cancelada"],
    required: false
  })
  status: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(350)
  @ApiProperty({
    description: "Description of what will be studied within this meeting",
    examples: ["We're going to study algebra", "We're going to study data structures"],
    minLength: 1,
    maxLength: 350,
    required: false
  })
  description: string

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(200)
  @ApiProperty({
    description: "Where the meeting will happen",
    examples: ["Franco da Rocha Mall", "Park next to highway"],
    minLength: 1,
    maxLength: 200,
    required: false
  })
  place: string

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: "How many people confirmed presence previously",
    example: 8,
    required: false
  })
  num_persons: number
  
  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: "When the meeting will happen",
    example: "2023-08-25 14:00:00",
    format: "yyyy-mm-dd hh:ss:mm",
    required: false
  })
  date_hour: string

}