import { randomUUID } from "node:crypto";

export class Unit {
    private _id: string
    private name: string

    constructor(name: string, id?: string) {
        this._id = id ?? randomUUID();
        this.name = name;
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