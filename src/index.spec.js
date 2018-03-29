import {filetypeinfo, filetypename} from './index';

describe("Traversing", () => {
  it("typeinfo", () => {
      const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      expect(filetypeinfo(bytes)).toHaveLength(1)
      expect(filetypeinfo(bytes)[0]).toHaveProperty("typename")
  })

  it("typename", () => {
    const bytes = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
      expect(filetypename(bytes)).toHaveLength(1)
      expect(filetypename(bytes)).toContain("png")
  })
})