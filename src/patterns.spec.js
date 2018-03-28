import { matchStr as match, matchRpm, matchPDM, matchDBA } from "./binary";

describe("Binary files", () => {
    it("RPM", () => {
        const bytes = ["0xed", "0xab", "0xee", "0xdb"];
        expect(match("rpm")(bytes)).toBe(true);
    });

    it("BIN", () => {
        const bytes = ["0x53", "0x50", "0x30", "0x31"];
        expect(match("bin")(bytes)).toBe(true);
    });

    it("PIC, PIF, SEA, YTR", () => {
        const bytes = ["0x00"];
        expect(match("pic")(bytes)).toBe(true);
    });

    it("PDB", () => {
        // 00 00 00 00 00 00 00 00
        // 00 00 00 00 00 00 00 00
        // 00 00 00 00 00 00 00 00
        const bytes = [
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00",
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00",
            "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00", "0x00"
        ];
        expect(match("pdb")(bytes)).toBe(true);
    });

    it("DBA", () => {
        const bytes = ["0xBE", "0xBA", "0xFE", "0xCA"];
        const bytesTodo = ["0x00", "0x01", "0x42", "0x44"];
        expect(match("dba")(bytes)).toBe(true);
        expect(match("dba2")(bytesTodo)).toBe(true);
    })
    it("TDA", () => {
        const bytes = ["0x00", "0x01", "0x44", "0x54"];
        expect(match("tda")(bytes));
        const bytesDataFile = ["0x00", "0x01", "0x00", "0x00"];
        expect(match("tda2")(bytesDataFile)).toBe(true);
    })
    
    it("ICO", () => {
        const bytes = ["0x00", "0x00", "0x01", "0x00"];
        expect(match("ico")(bytes)).toBe(true);
    })
    
    it("3GP", () => {
        const bytes = ["0x66", "0x74", "0x79", "0x70", "0x33", "0x67"];
        expect(match("3gp")(bytes)).toBe(true);
    })
    
    it("z", () => {
        const bytes = ["0x1F", "0x9D"];
        expect(match("z")(bytes)).toBe(true);
    })
    
    
    it("tar.z", () => {
        const bytes = ["0x1F", "0xA0"];
        expect(match("tar.z")(bytes)).toBe(true);
    })
    
    it('bac', () => {
        const bytes = ["0x42", "0x41", "0x43", "0x4B", "0x4D", "0x49", "0x4B", "0x45", "0x44", "0x49", "0x53", "0x4B"];
        expect(match("bac")(bytes)).toBe(true);  
    })
    
    it("bz2", () => {
        const bytes = ["0x42", "0x5A", "0x68"];
        expect(match("bz2")(bytes)).toBe(true);
    })
    
    it("tif", () => {
        const bytes = ["0x49", "0x49", "0x2A", "0x00"];
        expect(match("tif")(bytes)).toBe(true);
    })
    
    it("tiff", () => {
        const bytes = ["0x4D", "0x4D", "0x00", "0x2A"];
        expect(match("tiff")(bytes)).toBe(true);
    })

    it("cr2", () => {
        const bytes =  ["0x49", "0x49", "0x2A", "0x00", "0x10", "0x00", "0x00", "0x00", "0x43", "0x52"];
        expect(match("cr2")(bytes)).toBe(true);
    })

    it("cin", () => {
        const bytes =  ["0x80", "0x2A", "0x5F", "0xD7"];
        expect(match("cin")(bytes)).toBe(true);
    })

    it("cin1", () => {
        const bytes =  ["0x52", "0x4E", "0x43", "0x01"];
        expect(match("cin1")(bytes)).toBe(true);
    })

    it("cin2", () => {
        const bytes =  ["0x52", "0x4E", "0x43", "0x02"];
        expect(match("cin2")(bytes)).toBe(true);
    })

    it("dpx", () => {
        const bytes =  ["0x53", "0x44", "0x50", "0x58"];
        expect(match("dpx")(bytes)).toBe(true);
    })

    it("dpx2", () => {
        const bytes =  ["0x58", "0x50", "0x44", "0x53"];
        expect(match("dpx2")(bytes)).toBe(true);
    })

    it("exr", () => {
        const bytes =  ["0x76", "0x2F", "0x31", "0x01"];
        expect(match("exr")(bytes)).toBe(true);
    })

    it("bpg", () => {
        const bytes =  ["0x42", "0x50", "0x47", "0xFB"];
        expect(match("bpg")(bytes)).toBe(true);
    })

    it("ilbm, lbm ibm iff", () => {
        const bytes = ["0x46","0x4F","0x52","0x4D","0x47","0x49","0x47","0x47","0x49","0x4C","0x42","0x4D"]
        expect(match("ilbm")(bytes)).toBe(true);
    })

    it("8svx", () => {
        const bytes = ["0x46", "0x4F", "0x52", "0x4D", "0x47", "0x47", "0x47", "0x47", "0x38", "0x53", "0x56", "0x58"];
        expect(match("8svx")(bytes)).toBe(true);
    })
})