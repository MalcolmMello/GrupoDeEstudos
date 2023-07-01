import { Course } from "@application/entities/course";
import { makeUnit } from "./unit-factory";

export function makeCourse() {
    const unit = makeUnit();
    return new Course("Gestão de TI", unit);
}