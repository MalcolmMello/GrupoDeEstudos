import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository";
import { InMemoryStudentsRepository } from "@test/repositories/in-memory-students-repositories";
import { CreateMeeting } from "./create-meeting";
import { ConfirmPresence } from "./confirm-presence";
import { makeCourse } from "@test/factories/course-factory";
import { makeStudent } from "@test/factories/student-factory";
import { Host } from "@application/entities/host";
import { ScheduledMeetings } from "./scheduled-meetings";

describe('Scheduled meetings', () => {
  const meetingsRepository = new InMemoryMeetingsRepository();
  const studentsRepository = new InMemoryStudentsRepository();
  const createMeeting = new CreateMeeting(meetingsRepository, studentsRepository);
  const confirmPresence = new ConfirmPresence(meetingsRepository);
  const scheduledMeetings = new ScheduledMeetings(meetingsRepository);
  
  it('Should be able to return a student scheduled meetings', async () => {
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

    const { message } = await confirmPresence.execute({
      idHost: studentToConfirmPresence.idHost,
      idMeeting: meeting.id,
      idStudent: studentToConfirmPresence.id
    });

    const {meetings} = await scheduledMeetings.execute({idStudent: studentToConfirmPresence.id});


    expect(meetings).toHaveLength(1);
  })
})