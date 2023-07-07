import { randomUUID } from "node:crypto";
import { Student } from "./student";
import { StudentProps } from "./student";

export class Host extends Student {
    private _idHost: string;

    constructor(props: StudentProps, idHost?: string, idStudent?: string) {
      super(props, idStudent);
      this._idHost = idHost ?? randomUUID();
    }


    public get idHost(): string {
      return this._idHost;
    }

    public set idHost(id: string) {
      this._idHost = id;
    }
}