import { compare } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "@application/repositories/students-repository";

@Injectable()
export class AuthService {
  constructor(private studentsRepository: StudentsRepository) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.studentsRepository.findByEmail(username);

    const isPasswordCorrect = await compare(password, user.password);

    if(user && isPasswordCorrect) {
      return user;
    }

    return null;
  }
}