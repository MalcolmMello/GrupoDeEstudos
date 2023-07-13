import { Meeting } from "@application/entities/meeting";
import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { NoMeetingsFound } from "@application/use-cases/errors/no-meetings-found";

export class InMemoryMeetingsRepository implements MeetingsRepository {
  public meetings: Meeting[] = [];
  
  async createMeeting(meeting: Meeting): Promise<void> {
    this.meetings.push(meeting);
  }

  async updateMeeting(meeting: Meeting): Promise<Meeting> {
    throw new Error("Method not implemented.");
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

  async confirmPresence(idStudent: string, idMeeting: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async cancelPresence(idStudent: string, idMeeting: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async studentScheduledMeetings(idStudent: string): Promise<Meeting[]> {
    throw new Error("Method not implemented.");
  }

  async hostMeetings(): Promise<Meeting[]> {
    throw new Error("Method not implemented.");
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