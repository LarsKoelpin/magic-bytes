import * as fs from "fs";
import {
  filetypeextension,
  filetypeinfo,
  filetypemime,
  filetypename,
} from "./index";

describe("Tests the public API", () => {
  it("detects tar with offset", () => {
    const buffer = fs.readFileSync(require.resolve("./testfiles/a.tar"));
    const bytes = Array.prototype.slice.call(buffer, 0);
    expect(filetypeinfo(bytes)).toHaveLength(1);
    expect(filetypeinfo(bytes)[0].typename).toBe("tar");
  });

  it("detects apng", () => {
    const buffer = fs.readFileSync(require.resolve("./testfiles/a.apng"));
    const bytes = Array.prototype.slice.call(buffer, 0);
    expect(filetypeinfo(bytes)).toHaveLength(2);
    expect(filetypeinfo(bytes)[1].typename).toBe("apng");
    expect(filetypeinfo(bytes)[1].mime).toBe("image/apng");
    expect(filetypeinfo(bytes)[0].typename).toBe("png");
    expect(filetypeinfo(bytes)[0].mime).toBe("image/png");
  });

  it("detects mp4", () => {
    const buffer = fs.readFileSync(require.resolve("./testfiles/a.mp4"));
    const bytes = Array.prototype.slice.call(buffer, 0);
    expect(filetypeinfo(bytes)).toHaveLength(1);
    expect(filetypeinfo(bytes)[0].typename).toBe("mp4");
    expect(filetypeinfo(bytes)[0].mime).toBe("video/mp4");
  });

  it("filetypeinfo", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypeinfo(bytes)).toHaveLength(2);
    expect(filetypeinfo(bytes)[0]).toHaveProperty("typename");
  });

  it("filetypename", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypename(bytes)).toHaveLength(2);
    expect(filetypename(bytes)).toEqual(["png", "apng"]);
  });

  it("filetypename failure", () => {
    const bytes = [0x89, 0x00, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypename(bytes)).toHaveLength(0);
    expect(filetypename(bytes)).toEqual([]);
  });

  it("filetypemime", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypemime(bytes)).toHaveLength(2);
    expect(filetypemime(bytes)).toEqual(["image/png", "image/apng"]);
  });

  it("filetypemime not found", () => {
    const bytes = [0x89, 0x50, 0x00, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    expect(filetypemime(bytes)).toHaveLength(0);
    expect(filetypemime(bytes)).toEqual([]);
  });

  it("filetypeextension", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
    expect(filetypeextension(bytes)).toHaveLength(2);
    expect(filetypeextension(bytes)).toEqual(["png", "apng"]);
  });

  it("filetypextension not found", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x00, 0x0a, 0x1a, 0x0a];
    expect(filetypeextension(bytes)).toHaveLength(0);
    expect(filetypeextension(bytes)).toEqual([]);
  });
});
