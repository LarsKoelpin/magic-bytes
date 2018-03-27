import match from './match'

describe("Match", () => {
    it('Does not Match if Pattern is larger', () => {
        const pattern = [0x49, 0x47, '?', 0x50];
        const matching = [0x49, 0x47];
        expect(match(pattern)(matching)).toBe(false);
    });

    it("Ignores '?'", () => {
        const pattern = [0x49, 0x47, '?', 0x50];
        const matching = [0x49, 0x47, "hi", 0x50];
        expect(match(pattern)(matching)).toBe(true);
    })

    it("Matches pattern", () => {
        const pattern = [0x49, 0x47, 0x50];
        const matching = [0x49, 0x47, 0x50];
        expect(match(pattern)(matching)).toBe(true);
    })

    it("Does not Match pattern", () => {
        const pattern = [0x49, 0x47, 0x47];
        const matching = [0x49, 0x47, 0x50];
        expect(match(pattern)(matching)).toBe(false);
    });
});