import { CreateMeeting } from "./create-meeting";
import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository"
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repositories";
import { makeStudent } from "@test/factories/student-factory";
import { ConfirmPresence } from "./confirm-presence";
import { CancelPresence } from "./cancel-presence";
import { makeCourse } from "@test/factories/course-factory";
import { Host } from "@application/entities/host";

describe('Cancel presence', () => {
  const meetingsRepository = new InMemoryMeetingsRepository();
  const studentsRepository = new InMemoryStudentsRepository();
  const createMeeting = new CreateMeeting(meetingsRepository, studentsRepository);
  const confirmPresence = new ConfirmPresence(meetingsRepository);
  const cancelPresence = new CancelPresence(meetingsRepository)

  it('Should be able to cancel presence in a meeting', async () => {    
    const student = makeStudent();

    await studentsRepository.create(student);

    const { meeting } = await createMeeting.execute({
      idHost: student.idHost,
      subject: "Matemática",
      description: "Descrição muito legal de um grupo de estudos",
      place: "Lugar da reunião",
      num_persons: 8,
      date_hour: new Date(2023, 8, 30)
    });

    const course = makeCourse();
    
    const studentToConfirmPresence = new Host({
      name: 'Aluno', 
      email: 'Aluno@gmail.com', 
      password: 'senha123',
      semester: 3,
      course
    })

    await studentsRepository.create(studentToConfirmPresence);

    const { message: confirmedMessage } = await confirmPresence.execute({
      idHost: studentToConfirmPresence.idHost,
      idMeeting: meeting.id,
      idStudent: studentToConfirmPresence.id
    });

    const { message } = await cancelPresence.execute({
      idHost: studentToConfirmPresence.idHost,
      idMeeting: meeting.id,
      idStudent: studentToConfirmPresence.id
    });

    expect(message).toBe("Presence successfully canceled!");
  })

  it('Should be able to cancel presence in a meeting', async () => {    
    const student = makeStudent();

    await studentsRepository.create(student);

    const { meeting } = await createMeeting.execute({
      idHost: student.idHost,
      subject: "Matemática",
      description: "Descrição muito legal de um grupo de estudos",
      place: "Lugar da reunião",
      num_persons: 8,
      date_hour: new Date(2023, 8, 30)
    });

    try {
      const { message } = await cancelPresence.execute({
        idStudent: student.id,
        idMeeting: meeting.id,
        idHost: student.idHost,
      });
    } catch (error) {
      expect(error.message).toBe("You are the meeting host.");
    }
  })
})