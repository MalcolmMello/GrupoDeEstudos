import { Meeting } from "@application/entities/meeting";
import { makeStudent } from "./student-factory";

export function makeMeeting() {
    const host = makeStudent();
    const date = new Date();
    return new Meeting({
        subject: "Programação Web",
        description: "Vamos estudar javascript",
        place: "Parque",
        num_persons: 5,
        date_hour: date,
        host
    });
}