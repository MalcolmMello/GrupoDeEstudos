import { Meeting } from "@application/entities/meeting";

export class PrismaMeetingMapper {
  static toPrisma(meeting: Meeting) {
    return {
      idReuniao: meeting.id,
      data_hora: meeting.dateHour,
      descricao: meeting.description,
      local: meeting.place,
      materia: meeting.subject,
      num_pessoas: meeting.numPersons,
      organizadorId: meeting.host.idHost
    }
  }

  static toDomain() {

  }
}