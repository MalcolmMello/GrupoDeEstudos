import { Course } from "@application/entities/course";

export abstract class CourseRepository {
    abstract findById(id: string): Promise<Course | null>;
    abstract create(course: Course): Promise<void>;
    abstract getCourses(): Promise<Course[]>
}