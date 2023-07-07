import { Host } from "@application/entities/host";

export abstract class StudentsRepository {
    abstract create(student: Host): Promise<void>;
    abstract findByEmail(email: string): Promise<Host | null>
    abstract findById(id: string): Promise<Host | null>;
}