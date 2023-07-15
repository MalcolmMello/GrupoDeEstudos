import { Meeting } from "@application/entities/meeting";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { StudentNotFound } from "./errors/student-not-found";

interface MeetingResponse {
  meeting: Meeting
}

interface CreateMeetingRequest {
  subject: string,
  description: string,
  place: string,
  num_persons: number,
  idHost: string,
  date_hour: Date
}

@Injectable()
export class CreateMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository, 
    private studentsRepository: StudentsRepository
  ) {}

  async execute(request: CreateMeetingRequest): Promise<MeetingResponse> {
    const { subject, description, place, num_persons, idHost, date_hour } = request;
  
    const student = await this.studentsRepository.findByHostId(idHost);

    if(!student) {
      throw new StudentNotFound();
    }

    const meeting = new Meeting({
      subject,
      description,
      place,
      num_persons,
      date_hour,
      status: "Em aberto",
      host: student 
    });

    await this.meetingsRepository.createMeeting(meeting); 

    return {
      meeting
    };
  }
}