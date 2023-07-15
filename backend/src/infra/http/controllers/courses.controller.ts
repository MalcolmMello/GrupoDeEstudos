import { GetCourses } from "@application/use-cases/get-courses";
import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import coursesResponse from "../responses/CoursesResponses";

@ApiTags('courses')
@Controller('courses')
export class CoursesController {
  constructor(
    private getCourses: GetCourses
  ) {}

  @Get()
  @ApiOperation({ summary: "Return all available courses" })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'array',
      items: coursesResponse
    }
  })
  async courses() {
    try {
      const { courses } = await this.getCourses.execute();

      return courses;
    } catch (error) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: error.message,
      }, HttpStatus.NOT_FOUND, {
        cause: error
      });
    }
  }
}