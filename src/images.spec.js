import { matchesJpg, matchesJpeg, matchesJfif, matchesGifA, matchesGifB } from "./images";

describe('Matches images', () => {

    it('Matches JPEG', () => {
        const imageBytes = [0xFF, 0xD8, 0xFF, 0xDB];
        expect(matchesJpg(imageBytes)).toBe(true);
    });

    it('Matches JPEGa', () => {
        const imageBytes = [0xFF, 0xD8, 0xFF, 0xE0, 0x47, 0x47, 0x4A, 0x46, 0x49, 0x46, 0x00, 0x01];
        expect(matchesJpeg(imageBytes)).toBe(true);
    });

    it('Matches jfiff', () => {
        const imageBytes = [0xFF, 0xD8, 0xFF, 0xE1, 0x47, 0x45, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00];
        expect(matchesJfif(imageBytes)).toBe(true);
    })

    it('Matches GIFa', () => {
        const imageBytes = [0x47, 0x49, 0x46, 0x38, 0x37, 0x61];
        expect(matchesGifA(imageBytes)).toBe(true);
    });

    it('Matches GIFb', () => {
        const imageBytes = [0x47, 0x49, 0x46, 0x38, 0x39, 0x61];
        expect(matchesGifB(imageBytes)).toBe(true);
    })
})