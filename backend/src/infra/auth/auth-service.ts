import { Injectable } from "@nestjs/common";
import { StudentsRepository } from "@application/repositories/students-repository";

@Injectable()
export class AuthService {
  constructor(private studentsRepository: StudentsRepository) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.studentsRepository.findByEmail(username);

    if(user && user.password === password) {
      return user;
    }

    return null;
  }
}