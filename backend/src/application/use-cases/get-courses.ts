import { Course } from "@application/entities/course";
import { CourseRepository } from "@application/repositories/course-repository";
import { Injectable } from "@nestjs/common";
import { NoCourses } from "./errors/no-courses";

interface GetCoursesResponse {
  courses: Course[] | NoCourses
};

@Injectable()
export class GetCourses {
  constructor(private courseRepository: CourseRepository) {}

  async execute(): Promise<GetCoursesResponse> {
    const courses = await this.courseRepository.getCourses();

    if(!courses) {
      throw new NoCourses();
    }
    
    return {
      courses
    };
  }
}