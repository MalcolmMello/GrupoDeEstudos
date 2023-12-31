import { randomUUID } from "node:crypto";
import { Host } from "./host";
import { Student } from "./student";

export interface MeetingProps {
    subject: string,
    description: string,
    place: string,
    status: string,
    num_persons: number,
    date_hour: Date
    host: Host,
}

export class Meeting {
    private _id
    private props: MeetingProps
    private students?: Host[] = []

    constructor(props: MeetingProps, id?: string, students?: Host[]) {
        this._id = id ?? randomUUID();
        this.props = props;
        this.students = students ?? []
    }

    public set id(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set subject(subject: string) {
        this.props.subject = subject;
    }

    public get subject(): string {
        return this.props.subject;
    }

    public set description(description: string) {
        this.props.description = description;
    }

    public get description(): string {
        return this.props.description;
    }

    public set place(place: string) {
        this.props.place = place;
    }

    public get place(): string {
        return this.props.place;
    }

    public set numPersons(persons: number) {
        this.props.num_persons = persons;
    }

    public get numPersons(): number {
        return this.props.num_persons;
    }

    public set status(status: string) {
        this.props.status = status;
    }

    public get status(): string {
        return this.props.status;
    }

    public set dateHour(date: Date) {
        this.props.date_hour = date;
    }

    public get dateHour(): Date {
        return this.props.date_hour;
    }

    public set host(host: Host) {
        this.props.host = host;
    }

    public get host(): Host {
        return this.props.host;
    }

    public set setstudents(student: Host[]) {
        for(let i = 0; i < student.length; i++) {
            this.students.push(student[i]);
        }
    }

    public get getstudents(): Host[] {
        return this.students;
    }
}