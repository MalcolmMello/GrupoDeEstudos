import { Meeting } from "@application/entities/meeting";

export class MeetingViewModel {
  static toHTTP(meeting: Meeting) {
    return {
      _id: meeting.id,
      subject: meeting.subject,
      description: meeting.description,
      place: meeting.place,
      num_persons: meeting.numPersons,
      date_hour: meeting.dateHour,
      host: {
        _id: meeting.host.idHost,
        name: meeting.host.name,
        email: meeting.host.email,
        semester: meeting.host.semester,
        course: meeting.host.course
      },
      _idHost: meeting.host.idHost
    }
  }
}