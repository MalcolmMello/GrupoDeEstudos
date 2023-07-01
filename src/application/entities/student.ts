import { randomUUID } from "node:crypto";
import { Course } from "./course";

export interface StudentProps {
    name: string,
    email: string,
    password: string
    semester: number
    course: Course
}

export class Student {
    private _id: string
    private props: StudentProps

    constructor(props: StudentProps, id?: string) {
        this._id = id ?? randomUUID();
        
        const isSemesterValid = this.validateSemester(props.semester);

        if(!isSemesterValid) {
            throw new Error("Semester is not valid");
        }

        this.props = props;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set name(name: string) {
        this.props.name = name;
    }

    public get name(): string {
        return this.props.name;
    }

    public set email(email: string) {
        this.props.email = email;
    }

    public get email(): string {
        return this.props.email;
    }

    public set password(password: string) {
        this.props.password = password;
    }

    public get password(): string {
        return this.props.password;
    }

    public set semester(semester: number) {
        const isSemesterValid = this.validateSemester(semester);

        if(!isSemesterValid) {
            throw new Error("Semester is not valid");
        }

        this.props.semester = semester;
    }

    public get semester(): number {
        return this.props.semester;
    }

    public set course(course: Course) {
        this.course = course;
    }

    public get course(): Course {
        return this.course;
    }

    private validateSemester(semestre: number): boolean {
        return semestre >= 1 && semestre <= 6;
    }
}