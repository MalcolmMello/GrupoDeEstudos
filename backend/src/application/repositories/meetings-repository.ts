import { Meeting } from "@application/entities/meeting";

export abstract class MeetingsRepository {
  abstract createMeeting(meeting: Meeting): Promise<void>;
  abstract updateMeeting(meeting: Meeting): Promise<Meeting | null>;
  abstract cancelMeeting(idMeeting: string): Promise<void>;
  abstract getMeetings(): Promise<Meeting[]>;
  abstract confirmPresence(idStudent: string, idMeeting: string): Promise<void>;
  abstract cancelPresence(idStudent: string, idMeeting: string): Promise<void>;
  abstract studentScheduledMeetings(idStudent: string): Promise<Meeting[]>;
  abstract hostMeetings(): Promise<Meeting[]>;
}