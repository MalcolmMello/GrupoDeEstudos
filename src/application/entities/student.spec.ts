import { makeStudent } from "@test/factories/student-factory";
import { Course } from "./course";
import { Student } from "./student";
import { Unit } from "./unit";

describe('Student content',  () => {

    it('should be able to create a student', () => {
        const student = makeStudent();

        expect(student).toBeTruthy();
    }),

    it('should not be able to create a notification with an invalid semester', () => {
        const unit = new Unit("Etec");
        const course = new Course("Desenvovimento de Sistemas", unit);
        
        expect(() => new Student({
            name: 'Malcolm', 
            email: 'malcolm@gmail.com', 
            password: 'senha123',
            semester: 7,
            course
        })).toThrowError();
    })
})