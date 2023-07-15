import { makeMeeting } from "@test/factories/meeting-factory";
import { GetOpenMeetings } from "./get-open-meetings";
import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository";
import { GetHostMeetings } from "./get-host-meetings";

describe('Get host meetings', () => {
  it('Should be able to show host meetings', async () => {
    const meetingsRepository = new InMemoryMeetingsRepository();
    const getHostMeetings = new GetHostMeetings(meetingsRepository);

    const newMeeting = makeMeeting();

    await meetingsRepository.createMeeting(newMeeting);

    const { meetings } = await getHostMeetings.execute({idHost: newMeeting.host.idHost});

    expect(meetingsRepository.meetings).toHaveLength(1);
    expect(meetings).toHaveLength(1);
  });
})