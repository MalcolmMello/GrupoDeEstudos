import { Host } from "@application/entities/host";
import { Meeting } from "@application/entities/meeting";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { NoMeetingsFound } from "@application/use-cases/errors/no-meetings-found";
import { makeCourse } from "@test/factories/course-factory";

export class InMemoryMeetingsRepository implements MeetingsRepository {
  public meetings: Meeting[] = [];
  
  async createMeeting(meeting: Meeting): Promise<void> {
    this.meetings.push(meeting);
  }

  async updateMeeting(meeting: Meeting): Promise<void> {
    let meetingExists = this.meetings.find((item) => item.id === meeting.id);

    if(!meetingExists) {
      throw new Error("Something went wrong.");
    }

    for(let i = 0; i < this.meetings.length; i++) {
      if(this.meetings[i].id === meetingExists.id) {
        this.meetings[i] = meeting;
      }
    }
  }

  async cancelMeeting(idMeeting: string): Promise<void | Error> {
    const meeting = this.meetings.find((item) => item.id === idMeeting);

    if(!meeting) {
      throw new Error("Something went wrong.");
    }
    
    meeting.status = "Cancelada";
  }

  async getMeetings(): Promise<Meeting[]> {
    const meetings = this.meetings.filter((item) => item.status === "Em aberto");

    return meetings;
  }

  async confirmPresence(idMeeting: string, idStudent: string, idHost: string): Promise<void> {
    const meeting = this.meetings.find((item) => item.id === idMeeting);

    if(meeting.host.idHost === idHost) {
      throw new Error("You are the meeting host already.");
    }

    const course = makeCourse();

    const student = new Host({
      name: 'Aluno', 
      email: 'Aluno@gmail.com', 
      password: 'senha123',
      semester: 3,
      course
    },
    idStudent,
    idStudent
    )

    meeting.numPersons++;
    meeting.setstudents = [student];
  }

  async cancelPresence(idMeeting: string,idStudent: string, idHost: string): Promise<void> {
    const meeting = this.meetings.find((item) => item.id === idMeeting);

    if(!meeting) {
      throw new Error("No meeting found.");
    }

    if(meeting.host.idHost === idHost) {
      throw new Error("You are the meeting host.");
    }

    meeting.setstudents = meeting.getstudents.filter((item) => item.id !== idStudent);
  }

  async studentScheduledMeetings(idStudent: string): Promise<Meeting[]> {
    const meetings = this.meetings.filter((item) => {
      for(let i = 0; i < item.getstudents.length; i++) {
        item.getstudents[i].id === idStudent;
        return item;
      }
    });

    if(!meetings) {
      throw new Error("No meetings found.");
    }

    return meetings;
  }

  async hostMeetings(idHost: string): Promise<Meeting[]> {
    const meetings = this.meetings.filter((item) => item.host.idHost === idHost);

    if(!meetings) {
      throw new Error("No meetings found.");
    }

    return meetings;
  }

  async searchMeetings(subject?: string, description?: string, semester?: number, date_hour?: Date): Promise<Meeting[]> {
    const meetings = this.meetings.filter(
      (item) => item.subject.toLowerCase().includes(subject.toLowerCase()) ||
      item.description.toLowerCase().includes(description.toLowerCase()) ||
      item.host.semester === semester ||
      item.dateHour <= date_hour
    );

    if(!meetings) {
      throw new NoMeetingsFound();
    }

    return meetings;
  }

}