import { GetCourses } from "@application/use-cases/get-courses";
import { Controller, Get, HttpException, HttpStatus } from "@nestjs/common";

@Controller('courses')
export class CoursesController {
  constructor(
    private getCourses: GetCourses
  ) {}

  @Get()
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