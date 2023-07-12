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
    
    const newReuniao = await this.prisma.reuniao.create({
      data: raw
    });
  }

  async updateMeeting(meeting: Meeting): Promise<Meeting> {
    throw new Error("Method not implemented.");
  }

  async cancelMeeting(idMeeting: string, idHost: string): Promise<void> {
    const meetingExists = await this.prisma.reuniao.findFirst({
      where: {
        idReuniao: idMeeting,
        organizadorId: idHost
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
        }
      }
    });
   
    if(!meetings) {
      throw new Error("No open meetings.");
    }

    return meetings.map(PrismaMeetingMapper.toDomain);
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
}