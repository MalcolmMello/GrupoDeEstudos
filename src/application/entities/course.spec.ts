import { makeCourse } from "@test/factories/course-factory";

describe('Course content',  () => {
    it('should be able to create a course', () => {
        const course = makeCourse();

        expect(course).toBeTruthy();
    })
})