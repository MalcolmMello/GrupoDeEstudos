import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository"
import { GetCourses } from "./get-courses";
import { makeCourse } from "@test/factories/course-factory";

describe('Get courses', () => {
  it('Should be able to show all courses', async () => {
    const coursesRepository = new InMemoryCourseRepository();
    const getCourses = new GetCourses(coursesRepository);

    const course = makeCourse();

    coursesRepository.create(course);

    const { courses } = await getCourses.execute();

    expect(coursesRepository.courses).toHaveLength(1);
    expect(courses).toHaveLength(1);
  })
})