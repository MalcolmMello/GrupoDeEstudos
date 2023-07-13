import { Meeting } from "@application/entities/meeting";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { StudentsRepository } from "@application/repositories/students-repository";
import { Injectable } from "@nestjs/common";
import { StudentNotFound } from "./errors/student-not-found";

interface UpdateMeetingResponse {
  meeting: Meeting
}

interface CreateMeetingRequest {
  idMeeting: string,
  subject: string,
  description: string,
  place: string,
  status: string,
  num_persons: number,
  idHost: string,
  date_hour: Date
}

@Injectable()
export class UpdateMeeting {
  constructor(
    private meetingsRepository: MeetingsRepository, 
    private studentsRepository: StudentsRepository
  ) {}

  async execute(request: CreateMeetingRequest): Promise<UpdateMeetingResponse> {
    const { subject, description, place, status, num_persons, idHost, idMeeting, date_hour } = request;
  
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
      status,
      host: student 
    },
    idMeeting
    );

    await this.meetingsRepository.updateMeeting(meeting); 

    return {
      meeting
    };
  }
}