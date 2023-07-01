import { makeUnit } from "@test/factories/unit-factory";

describe('Unit content',  () => {
    it('should be able to create a unit', () => {
        const unit = makeUnit();

        expect(unit).toBeTruthy();
    })
})