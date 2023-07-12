import { Aluno as RawAluno, Reuniao as RawReuniao, Unidade as RawUnidade } from "@prisma/client"
import { Course } from "@application/entities/course";
import { Host } from "@application/entities/host";
import { Meeting } from "@application/entities/meeting";
import { Unit } from "@application/entities/unit";

interface RawAlunoInterface extends RawAluno {
  curso: {
    idCurso: string
    nome: string
    unidade: RawUnidade
  }
}

interface RawReuniaoWithJoins extends RawReuniao {
    organizador: {
      idOrganizador: string,
      alunoId: string,
      aluno: RawAlunoInterface
    }
}

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

  static toDomain(meeting: RawReuniaoWithJoins) {
    const unit = new Unit(meeting.organizador.aluno.curso.unidade.nome, meeting.organizador.aluno.curso.unidade.idUnidade);
    
    const course = new Course(meeting.organizador.aluno.curso.nome, unit, meeting.organizador.aluno.cursoId);
    
    const host = new Host({
      course: course,
      email: meeting.organizador.aluno.email,
      name: meeting.organizador.aluno.nome,
      password: meeting.organizador.aluno.senha,
      semester: meeting.organizador.aluno.semestre
    },
    meeting.organizadorId,
    meeting.organizador.alunoId
    );

    return new Meeting({
      subject: meeting.materia,
      description: meeting.descricao,
      date_hour: meeting.data_hora,
      num_persons: meeting.num_pessoas,
      place: meeting.local,
      status: meeting.status,
      host
    }, meeting.idReuniao);
  }
}