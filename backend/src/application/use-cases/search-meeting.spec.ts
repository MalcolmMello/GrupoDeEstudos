import { InMemoryMeetingsRepository } from "@test/repositories/in-memory-meetings-repository"
import { SearchMeeting } from "./search-meetings";
import { makeMeeting } from "@test/factories/meeting-factory";

describe('Search meeting', () => {
  const meetingsRepository = new InMemoryMeetingsRepository();
  const searchMeeting = new SearchMeeting(meetingsRepository);
  
  it('Should be able to search a meeting', async () => {
    const newMeeting = makeMeeting();

    await meetingsRepository.createMeeting(newMeeting);

    const { meetings } = await searchMeeting.execute({subject: "Programação", description: "Vamos"});

    expect(meetings).toHaveLength(1);
  })

  it('Should not be able to search a meeting', async () => {
    const newMeeting = makeMeeting();

    await meetingsRepository.createMeeting(newMeeting);

    const { meetings } = await searchMeeting.execute({subject: "zzzzz", description: "texto"});

    expect(meetings).toHaveLength(0);
  })
})