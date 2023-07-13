import { makeMeeting } from "@test/factories/meeting-factory";
import { GetOpenMeetings } from "./get-open-meetings";
import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository";

describe('Get open meetings', () => {
  it('Should be able to show open meetings', async () => {
    const meetingsRepository = new InMemoryMeetingsRepository();
    const getOpenMeetings = new GetOpenMeetings(meetingsRepository);

    const newMeeting = makeMeeting();

    await meetingsRepository.createMeeting(newMeeting);

    const meetings = await getOpenMeetings.execute();

    expect(meetingsRepository.meetings).toHaveLength(1);
    expect(meetings.meetings).toHaveLength(1);
  });
})