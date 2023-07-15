import { ApiPropertyOptional } from "@nestjs/swagger"

export class OptionalParams {
  @ApiPropertyOptional()
  subject?: string

  @ApiPropertyOptional()
  description?: string

  @ApiPropertyOptional()
  date_hour?: string

  @ApiPropertyOptional()
  semester?: string
}