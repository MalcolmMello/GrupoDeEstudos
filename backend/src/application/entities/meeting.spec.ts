import { makeMeeting } from "@test/factories/meeting-factory";


describe('Meeting content',  () => {
    
    it('should be able to create a meeting', () => {
        
        const meeting = makeMeeting();

        expect(meeting).toBeTruthy();
    })
})