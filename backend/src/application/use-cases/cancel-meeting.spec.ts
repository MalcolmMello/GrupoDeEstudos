import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository";
import { CancelMeeting } from "./cancel-meeting";
import { CreateMeeting } from "./create-meeting";
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repositories";
import { makeStudent } from "@test/factories/student-factory";

describe('Cancel meeting', () => {
  const meetingsRepository = new InMemoryMeetingsRepository();
  const studentsRepository = new InMemoryStudentsRepository();

  const createMeeting = new CreateMeeting(meetingsRepository, studentsRepository);
  const cancelMeeting = new CancelMeeting(meetingsRepository);
  
  it('Should be able to cancel a meeting', async () => {
    
    const student = makeStudent();

    await studentsRepository.create(student);

    const { meeting }= await createMeeting.execute({
      idHost: student.idHost,
      subject: "Matemática",
      description: "Descrição muito legal de um grupo de estudos",
      place: "Lugar da reunião",
      num_persons: 8,
      date_hour: new Date(2023, 8, 30)
    });

    const response = cancelMeeting.execute({
      idMeeting: meeting.id,
      idHost: meeting.host.id
    });

    expect(meetingsRepository.meetings).toHaveLength(1);
    expect(meetingsRepository.meetings[0]).toEqual(meeting);
  });

  it('Should not be able to cancel a meeting', async () => {
    const student = makeStudent();

    await studentsRepository.create(student);

    const { meeting }= await createMeeting.execute({
      idHost: student.idHost,
      subject: "Matemática",
      description: "Descrição muito legal de um grupo de estudos",
      place: "Lugar da reunião",
      num_persons: 8,
      date_hour: new Date(2023, 8, 30)
    });

    try {
      const response = await cancelMeeting.execute({
        idMeeting: "invalid id",
        idHost: "invalid id"
      });
    } catch (error) {
      expect(error.message).toBe("Something went wrong.");  
    }
    
  });
})