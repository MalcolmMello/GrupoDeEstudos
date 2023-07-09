import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repositories"
import { CreateStudent } from "./create-student";
import { InMemoryCourseRepository } from "@test/repositories/in-memory-course-repository";
import { makeCourse } from "@test/factories/course-factory";

describe('Create student', () => {
    it('should be able to create a student', async () => {
        const studentsRepository = new InMemoryStudentsRepository();
        const courseRepository = new InMemoryCourseRepository();
        const createStudent = new CreateStudent(studentsRepository, courseRepository);

        const course = makeCourse();
        await courseRepository.create(course);

        const { student } = await createStudent.execute({
            name: "Aluno de teste",
            email: "aluno@gmail.com",
            password: "senha321",
            semester: 5,
            idCourse: course.id
        });

        expect(studentsRepository.students).toHaveLength(1);
        expect(studentsRepository.students[0]).toEqual(student);


    });
});