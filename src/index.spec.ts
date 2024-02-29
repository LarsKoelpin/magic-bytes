import * as fs from "fs";
import {
  filetypeextension,
  filetypeinfo,
  filetypemime,
  filetypename,
} from "./index";

const getBytes = (filename: string) => {
  const file = require.resolve(`./testfiles/${filename}`);
  const buffer = fs.readFileSync(file);
  return Array.prototype.slice.call(buffer, 0);
};

describe("Tests the public API", () => {
  it("detects woff", () => {
    const bytes = getBytes("font.woff");
    const [result] = filetypeinfo(bytes);
    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      typename: "woff",
      mime: "font/woff",
      extension: "woff",
    });
  });
  it("detects woff2", () => {
    const bytes = getBytes("inter.woff2");
    const [result] = filetypeinfo(bytes);
    expect(result).toBeDefined();
    expect(result).toStrictEqual({
      typename: "woff2",
      mime: "font/woff2",
      extension: "woff2",
    });
  });
  it("detects tar with offset", () => {
    const bytes = getBytes("a.tar");
    const [result] = filetypeinfo(bytes);
    expect(result).toBeDefined();
    expect(result.typename).toBe("tar");
  });

  it("detects apng", () => {
    const bytes = getBytes("a.apng");
    const result = filetypeinfo(bytes);
    expect(result).toHaveLength(2);
    const [png, apng] = result;
    expect(png.typename).toBe("png");
    expect(png.mime).toBe("image/png");
    expect(apng.typename).toBe("apng");
    expect(apng.mime).toBe("image/apng");
  });

  it("detects mp4", () => {
    const bytes = getBytes("a.mp4");
    const [result] = filetypeinfo(bytes);
    expect(result).toBeDefined();
    expect(result.typename).toBe("mp4");
    expect(result.mime).toBe("video/mp4");
  });

  describe("detects ogg containers", () => {
    it("detects ogv", () => {
      const bytes = getBytes("a.ogv");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("ogv");
      expect(result.mime).toBe("video/ogg");
    });

    it("detects ogm", () => {
      const bytes = getBytes("a.ogm");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("ogm");
      expect(result.mime).toBe("video/ogg");
    });

    it("detects oga", () => {
      const bytes = getBytes("a.oga");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("oga");
      expect(result.mime).toBe("audio/ogg");
    });

    it("detects spx", () => {
      const bytes = getBytes("a.spx");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("spx");
      expect(result.mime).toBe("audio/ogg");
    });

    it("detects ogg", () => {
      const bytes = getBytes("a.ogg");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("ogg");
      expect(result.mime).toBe("audio/ogg");
    });

    it("detects ogx", () => {
      const bytes = getBytes("a.ogx");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("ogx");
      expect(result.mime).toBe("application/ogg");
    });
  });

  describe("detects mov", () => {
    it("detects mov (moov)", () => {
      const bytes = getBytes("a.moov.mov");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("mov");
      expect(result.extension).toBe("mov");
      expect(result.mime).toBe("video/quicktime");
    });
    it("detects mov (mdat)", () => {
      const bytes = getBytes("a.mdat.mov");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("mov");
      expect(result.extension).toBe("mov");
      expect(result.mime).toBe("video/quicktime");
    });
    it("detects mov (ftypqt)", () => {
      const bytes = getBytes("a.ftypqt.mov");
      const [result] = filetypeinfo(bytes);
      expect(result).toBeDefined();
      expect(result.typename).toBe("mov");
      expect(result.extension).toBe("mov");
      expect(result.mime).toBe("video/quicktime");
    });
  });

  it("filetypeinfo", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const result = filetypeinfo(bytes);
    expect(result).toHaveLength(2);
    expect(result[0]).toHaveProperty("typename");
  });

  it("filetypename", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const result = filetypename(bytes);
    expect(result).toHaveLength(2);
    expect(result).toEqual(["png", "apng"]);
  });

  it("filetypename failure", () => {
    const bytes = [0x89, 0x00, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const result = filetypename(bytes);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("filetypemime", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const result = filetypemime(bytes);
    expect(result).toHaveLength(2);
    expect(result).toEqual(["image/png", "image/apng"]);
  });

  it("filetypemime not found", () => {
    const bytes = [0x89, 0x50, 0x00, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    const result = filetypemime(bytes);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("filetypeextension", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    const result = filetypeextension(bytes);
    expect(result).toHaveLength(2);
    expect(result).toEqual(["png", "apng"]);
  });

  it("filetypeextension not found", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    const result = filetypeextension(bytes);
    expect(result).toHaveLength(0);
    expect(result).toEqual([]);
  });

  it("detects utf8", () => {
    const file = getBytes("a.utf8");
    const result = filetypemime(file);
    expect(result).toContain("text/plain; charset=UTF-8");
  });

  it("detects utf16le", () => {
    const file = getBytes("a.utf16le");
    const result = filetypemime(file);
    expect(result).toContain("text/plain; charset=UTF-16LE");
  });

  it("detects utf16be", () => {
    const file = getBytes("a.utf16be");
    const result = filetypemime(file);
    expect(result).toContain("text/plain; charset=UTF-16BE");
  });

  it("detects json object", () => {
    const fileObj = getBytes("a.json");
    const fileArray = getBytes("a_array.json");
    const result = filetypemime(fileObj);
    const result2 = filetypemime(fileArray);
    expect(result).toContain("application/json");
    expect(result2).toContain("application/json");
  });

  it("detects srt", () => {
    const file = getBytes("a.srt");
    const result = filetypemime(file);
    expect(result).toContain("application/x-subrip");
  });

  it("detects vtt", () => {
    const file = getBytes("a.vtt");
    const result = filetypemime(file);
    expect(result).toContain("text/vtt");
  });

  it("detects jpeg (photoshop)", () => {
    // File created with Adobe Photoshop 2024 via "Save As" menu
    const file = getBytes("photoshop.jpg");
    const result = filetypemime(file);
    expect(result).toContain("image/jpeg");
  });

  it("detects jpeg (photoshop export)", () => {
    // File created with Adobe Photoshop 2024 via "Export As" menu
    const file = getBytes("photoshop-export.jpg");
    const result = filetypemime(file);
    expect(result).toContain("image/jpeg");
  });

  it("detects jpeg (png2jpg)", () => {
    // File created using https://png2jpg.com
    const file = getBytes("png2jpg.jpg");
    const result = filetypemime(file);
    expect(result).toContain("image/jpeg");
  });

  it("detects svg", () => {
    // File created using https://png2jpg.com
    const file = getBytes("a.svg");
    const result = filetypemime(file);
    expect(result).toContain("image/svg+xml");
  });
});
