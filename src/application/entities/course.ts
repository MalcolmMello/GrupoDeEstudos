import { randomUUID } from "node:crypto";
import { Unit } from "./unit";

export class Course {
    private _id: string
    private name: string
    private unit: Unit

    constructor(name: string, unit: Unit, id?: string) {
        this._id = id ?? randomUUID();
        this.name = name;
        this.unit = unit;
    }

    public set id(id: string) {
        this._id = id;
    }

    public get id(): string {
        return this._id;
    }

    public set setname(name: string) {
        this.name = name;
    }

    public get getname(): string {
        return this.name;
    }
}