import { AlunosOnReunioes as RawAlunosReunioes, Aluno as RawAluno, Reuniao as RawReuniao, Unidade as RawUnidade } from "@prisma/client"
import { Course } from "@application/entities/course";
import { Host } from "@application/entities/host";
import { Meeting } from "@application/entities/meeting";
import { Unit } from "@application/entities/unit";

interface RawAlunoInterface extends RawAluno {
  curso: {
    idCurso: string
    nome: string
    unidade: RawUnidade,
  }
}

interface RawAlunoReuniaoInterface extends RawAlunosReunioes {
  aluno: RawAlunoInterface
}

interface RawReuniaoWithJoins extends RawReuniao {
    organizador: {
      idOrganizador: string,
      alunoId: string,
      aluno: RawAlunoInterface,
    },
    alunos?: RawAlunoReuniaoInterface[]
}

interface PrismaSearch {
  subject?: string
  description?: string 
  semester?: number
  idHost?: string,
  idStudent?: string, 
  date_hour?: Date 
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

  static toPrismaSearch({semester, subject, description, date_hour, idHost, idStudent}: PrismaSearch) {
    const orStatement: any = [];
    
    if(idStudent) {
      orStatement.push(
        {
          alunos: {
            some: {alunoId: idStudent}
          }
        }
      )
    }
    if(idHost) {
      orStatement.push(
        {
          organizadorId: {
            equals: idHost
          }
        }
      )
    }
    if(description) {
      orStatement.push(
        {
          descricao: {
            contains: description
          }
        }
      );
    }
    if(subject) {
      orStatement.push(
        {
          materia: {
            contains: subject
          }
        },
      );
    }
    if(semester) {
      orStatement.push(
        {
          organizador: {
            aluno: {
              semestre: {
                equals: semester
              }
            }
          }
        }
      );
    }
    if(date_hour) {
      orStatement.push(
        {
          data_hora: {
            gte: date_hour
          }
        }
      );
    }
    
    return orStatement;
  }

  static toDomain(meeting: RawReuniaoWithJoins) {
    let students: Host[] = [];
    let studentsWhoConfirmedPresence: number;

    if(meeting.alunos) {
      studentsWhoConfirmedPresence = meeting.num_pessoas;

      for(let i = 0; i < meeting.alunos.length; i++) {
        let studentUnit = new Unit(meeting.alunos[i].aluno.curso.unidade.nome, meeting.alunos[i].aluno.curso.unidade.idUnidade)
        let studentCourse = new Course(meeting.alunos[i].aluno.curso.nome, studentUnit, meeting.alunos[i].aluno.cursoId);
        let student = new Host({
          course: studentCourse,
          email: meeting.alunos[i].aluno.email,
          name: meeting.alunos[i].aluno.nome,
          password: meeting.alunos[i].aluno.senha,
          semester: meeting.alunos[i].aluno.semestre
        }
        );

        students.push(student);
      }
    } else {
      studentsWhoConfirmedPresence = 0;
    }
    
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
      num_persons: meeting.num_pessoas + studentsWhoConfirmedPresence,
      place: meeting.local,
      status: meeting.status,
      host,
      
    }, 
    meeting.idReuniao,
    students
    );
  }
}