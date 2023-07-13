import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository";
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repositories";
import { CreateMeeting } from "./create-meeting";
import { makeStudent } from "@test/factories/student-factory";
import { UpdateMeeting } from "./update-meeting.";

describe('Update Meeting', () => {
  it('should be able to update a meeting', async () => {
    const meetingsRepository = new InMemoryMeetingsRepository();
    const studentsRepository = new InMemoryStudentsRepository();
    const createMeeting = new CreateMeeting(meetingsRepository, studentsRepository);
    const updateMeeting = new UpdateMeeting(meetingsRepository, studentsRepository);
    
    const student = makeStudent();

    await studentsRepository.create(student);

    const { meeting: newMeeting } = await createMeeting.execute({
      idHost: student.idHost,
      subject: "Matemática",
      description: "Descrição muito legal de um grupo de estudos",
      place: "Lugar da reunião",
      num_persons: 8,
      date_hour: new Date(2023, 8, 30)
    });

    const { meeting: updatedMeeting } = await updateMeeting.execute({
      idMeeting: newMeeting.id,
      idHost: student.idHost,
      subject: "Nova matéria",
      description: "Nova descrição",
      place: "Lugar da reunião",
      num_persons: 8,
      status: newMeeting.status,
      date_hour: new Date(2023, 8, 30)
    });

    expect(meetingsRepository.meetings).toHaveLength(1);
    expect(meetingsRepository.meetings[0]).toEqual(updatedMeeting);
  });
});