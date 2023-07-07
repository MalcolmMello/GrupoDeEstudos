import { Host } from "@application/entities/host";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private studentsRepository: StudentsRepository) { super(); }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, {id: user._id});
  }

  async deserializeUser(payload: any, done: (err: Error, payload: Host) => void) {
    const user = await this.studentsRepository.findById(payload.id);

    done(null, user);
  }
}