import { Course } from "@application/entities/course";
import { CourseRepository } from "@application/repositories/course-repository";

export class InMemoryCourseRepository implements CourseRepository {
    public courses: Course[] = [];

    async create(course: Course) {
        this.courses.push(course);
    }

    async findById(id: string): Promise<Course | null> {
        const course = this.courses.find((item) => item.id === id);

        return course;
    }

    async getCourses(): Promise<Course[]> {
        return this.courses;
    }
    
}