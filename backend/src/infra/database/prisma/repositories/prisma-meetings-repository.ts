import { MeetingsRepository } from "@application/repositories/meetings-repository";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Meeting } from "@application/entities/meeting";
import { PrismaMeetingMapper } from "../mappers/prisma-meeting-mapper";

@Injectable()
export class PrismaMeetingsRepository implements MeetingsRepository {
  
  constructor(private prisma: PrismaService) {}

  async createMeeting(meeting: Meeting): Promise<void> {
    const raw = PrismaMeetingMapper.toPrisma(meeting);
    
    await this.prisma.reuniao.create({
      data: raw
    });
  }

  async updateMeeting(meeting: Meeting): Promise<void> {
    const meetingExists = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: meeting.id,
        organizadorId: meeting.host.idHost
      }
    });

    if(!meetingExists) {
      throw new Error("Something went wrong.");
    }

    const raw = PrismaMeetingMapper.toPrisma(meeting);

    await this.prisma.reuniao.update({
      where: {
        idReuniao: meeting.id
      },
      data: raw
    });
  }

  async cancelMeeting(idMeeting: string, idHost: string): Promise<void> {
    const meetingExists = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        organizadorId: idHost
      },
      orderBy: {
        data_hora: "desc"
      }
    });

    if(!meetingExists) {
      throw new Error("Something went wrong.");
    }

    await this.prisma.reuniao.update({
      where: {
        idReuniao: idMeeting,
      },
      data: {
        status: "Cancelada"
      }
    });

  }

  async getMeetings(): Promise<Meeting[]> {
    const meetings = await this.prisma.reuniao.findMany({
      where: {
        status: "Em aberto"
      },
      include: {
        organizador:{
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        },
        alunos: {
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if(!meetings) {
      throw new Error("No open meetings.");
    }

    return meetings.map(PrismaMeetingMapper.toDomain);
  }

  async confirmPresence(idMeeting: string, idStudent: string, idHost: string): Promise<void> {
    const meetingExists = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        AND: {
          alunos: {
            none: {
              alunoId: idStudent
            }
          }
        }
      }
    });

    const isStudentTheMeetingHost = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        organizadorId: idHost
      }
    });

    if(isStudentTheMeetingHost) {
      throw new Error("You are the meeting host already!");
    }

    if(!meetingExists) {
      throw new Error("Meeting doesn't exist or you already confirmed your presence.");
    }
    
    await this.prisma.alunosOnReunioes.create({
      data: {
        alunoId: idStudent,
        reuniaoId: idMeeting
      }
    });

    await this.prisma.reuniao.update({
      where: {
        idReuniao: idMeeting
      },
      data: {
        num_pessoas: {
          increment: 1
        }
      }
    })
  }

  async cancelPresence(idMeeting: string, idStudent: string, idHost: string): Promise<void> {
    const meetingExists = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        AND: {
          alunos: {
            some: {
              alunoId: idStudent
            }
          }
        }
      }
    });

    const isStudentTheMeetingHost = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        organizadorId: idHost
      }
    });


    if(isStudentTheMeetingHost) {
      throw new Error("You are the meeting host!");
    }

    if(!meetingExists) {
      throw new Error("Meeting doesn't exist or you already cancel your presence.");
    }

    await this.prisma.alunosOnReunioes.delete({
      where: {
        alunoId_reuniaoId: {
          alunoId: idStudent,
          reuniaoId: idMeeting
        }
      }
    });
  }

  async studentScheduledMeetings(idStudent: string, subject?: string, description?: string, semester?: number, date_hour?: Date): Promise<Meeting[]> {
    const orStatement = PrismaMeetingMapper.toPrismaSearch(subject, description, semester, date_hour);
    const meetings = await this.prisma.reuniao.findMany({
      where: {
        OR: orStatement,
        alunos: {
          some: {alunoId: idStudent}
        }
      },
      include: {
        organizador:{
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        },
        alunos: {
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if(!meetings) {
      throw new Error("No meetings found.");
    }

    return meetings.map(PrismaMeetingMapper.toDomain);
  }

  async hostMeetings(idHost: string, subject?: string, description?: string, semester?: number, date_hour?: Date): Promise<Meeting[]> {
    const orStatement = PrismaMeetingMapper.toPrismaSearch(subject, description, semester, date_hour, idHost);
    
    const meetings = await this.prisma.reuniao.findMany({
      where: {
        OR: orStatement
      },
      include: {
        organizador:{
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        },
        alunos: {
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if(!meetings) {
      throw new Error("No open meetings.");
    }

    return meetings.map(PrismaMeetingMapper.toDomain);
  }

  async searchMeetings(subject?: string, description?: string, semester?: number, date_hour?: Date): Promise<Meeting[]> {
    const orStatement = PrismaMeetingMapper.toPrismaSearch(subject, description, semester, date_hour);
    
    const meetings = await this.prisma.reuniao.findMany({
      where: {
        OR: orStatement
      },
      include: {
        organizador: {
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        },
        alunos: {
          include: {
            aluno: {
              include: {
                curso: {
                  include: {
                    unidade: true
                  }
                }
              }
            }
          }
        }
      },
    });

    if(!meetings) {
      throw new Error("No meetings with the specified params.");
    }

    return meetings.map(PrismaMeetingMapper.toDomain);
  }
}