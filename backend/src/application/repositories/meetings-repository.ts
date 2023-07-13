import { Meeting } from "@application/entities/meeting";

export abstract class MeetingsRepository {
  abstract createMeeting(meeting: Meeting): Promise<void>;
  abstract updateMeeting(meeting: Meeting): Promise<void>;
  abstract cancelMeeting(idMeeting: string, idHost: string): Promise<void | Error>;
  abstract getMeetings(): Promise<Meeting[]>;
  abstract confirmPresence(idStudent: string, idMeeting: string): Promise<void>;
  abstract cancelPresence(idStudent: string, idMeeting: string): Promise<void>;
  abstract studentScheduledMeetings(idStudent: string): Promise<Meeting[]>;
  abstract hostMeetings(idHost: string): Promise<Meeting[]>;
  abstract searchMeetings(subject: string, description: string, semester: number, date_hour: Date): Promise<Meeting[]>
}